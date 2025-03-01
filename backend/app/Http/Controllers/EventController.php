<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Mail\EventJoined;
use App\Mail\EventCreated;
use App\Mail\EventFull;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;



class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        // Fetch events, ensuring they are not full or already joined
        $eventsQuery = Event::withCount('users')
            ->having('users_count', '<', DB::raw('max_participants'))
            ->orderBy('start_date', 'ASC');


        if (Auth::check()) {
            // If authenticated, exclude events the user has already joined
            $eventsQuery->whereDoesntHave('users', function ($query) {
                $query->where('users.id', Auth::id());
            });
        }

        // Apply search if needed
        if ($search) {
            $eventsQuery->where(function ($query) use ($search) {
                $query->where('title', 'LIKE', '%' . $search . '%')
                      ->orWhere('location', 'LIKE', '%' . $search . '%');
            });
        }

        // Get paginated results
        $events = $eventsQuery->paginate(15);
    
        return response()->json($events);
    }



    /**
     * Get user's hosted and joined events.
    */
    public function getEvents()
    {    
        $user = Auth::user();

        // Fetch hosted events with participant count
        $hostedEvents = Event::where('user_id', $user->id)
            ->withCount('users') // Ensures we have a count of users
            ->get();

        return response()->json([
            "joined" => $user->events,
            "hosted" => $hostedEvents->map(function ($event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'description' => $event->description,
                    'start_date' => $event->start_date,
                    'end_date' => $event->end_date,
                    'location' => $event->location,
                    'max_participants' => $event->max_participants,
                    'participants' => $event->users_count, // Ensure users_count is retrieved
                    'is_full' => $event->users_count >= $event->max_participants, // Boolean flag
                ];
            }),
        ]);
    }

    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validatedData = $request->validate([
        'title' => 'required|string|max:255',
        'location' => 'required|string|max:255',
        'start_date' => 'required|date',
        'end_date' => 'required|date',
        'max_participants' => 'required|integer|min:1',
        'description' => 'nullable|string|min:1',
        'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    // Handle thumbnail upload if provided
    if ($request->hasFile('thumbnail')) {
        // Store the file in the 'thumbnails' directory on the 'public' disk
        $path = $request->file('thumbnail')->store('thumbnails', 'public');
        // Generate the URL for the stored file
        $validatedData['thumbnail_url'] = Storage::disk('public')->url($path);
    } else {
        // Default thumbnail URL if none is provided
        $validatedData['thumbnail_url'] = asset('/default.jpg');
    }  

    // Create the event using the validated data plus the thumbnail_url
    $event = Event::create([
        'title' => $validatedData['title'],
        'location' => $validatedData['location'],
        'start_date' => $validatedData['start_date'],
        'end_date' => $validatedData['end_date'],
        'max_participants' => $validatedData['max_participants'],
        'description' => $validatedData['description'] ?? '',
        'user_id' => Auth::id(), // Event host is the logged-in user
        'thumbnail_url' => $validatedData['thumbnail_url'],
    ]);

    // Send email to the event creator
    Mail::to($event->host->email)->send(new EventCreated($event, $event->host));

    return response()->json($event, 201); // Return the created event with a 201 status
}


    /**
 * Join an event.
 */
public function join(string $id)
{
    $event = Event::find($id);
    $user = Auth::user();

    // Check if event exists.
    if (!$event) {
        return response()->json(["message" => "Event doesn't exist"], 400);
    }

    // Check if user already joined the event.
    if ($event->users()->where('user_id', $user->id)->exists()) {
        return response()->json(["message" => "You already joined this event"], 400);
    }

    // Check if event is full or not before adding the user.
    if ($event->users()->count() >= $event->max_participants) {
        return response()->json(["message" => "Event is full"], 400);
    }

    // Add the user to the event
    $event->users()->attach($user->id);

    // Send confirmation email to the user
    Mail::to($user->email)->send(new EventJoined($event, $user));

    // Check if event is full after the user joins
    if ($event->users()->count() >= $event->max_participants) {
        // Send email to the event creator notifying the event is full
        Mail::to($event->user->email)->send(new EventFull($event, $event->user));
    }

    // Return success message
    return response()->json(['message' => 'Successfully joined the event'], 200);
}


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $event = Event::with('host')->withCount('users')->find($id);
    
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }
    
        return response()->json([
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'start_date' => $event->start_date,
                'end_date' => $event->end_date,
                'location' => $event->location,
                'max_participants' => $event->max_participants,
                'thumbnail_url' => $event->thumbnail_url,
                'host' => $event->host,
                'participants' => $event->users_count,
                'is_full' => $event->users_count >= $event->max_participants, // Returns boolean
                'joined' => Auth::check() ? $event->users()->where('users.id', Auth::id())->exists() : false, // Did the user join this event?
        ]);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    $event = Event::findOrFail($id);

    if (Auth::id() !== $event->user_id) {
        return response()->json(['message' => 'You are not authorized to update this event'], 403);
    }

    $validatedData = $request->validate([
        'title' => 'required|string|max:255',
        'location' => 'required|string|max:255',
        'start_date' => 'required|date',
        'end_date' => 'required|date',
        'max_participants' => 'required|integer|min:1',
        'description' => 'nullable|string|min:1',
        'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    // Handle new thumbnail upload if provided
    if ($request->hasFile('thumbnail')) {
        // Check if the current thumbnail is not the default one before deleting
        if ($event->thumbnail_url && $event->thumbnail_url !== Storage::disk('public')->url('thumbnails/default.jpg')) {
            // Delete the old thumbnail if it's not the default one
            $oldPath = str_replace(Storage::disk('public')->url(''), '', $event->thumbnail_url);
            Storage::disk('public')->delete($oldPath);
        }

        // Store the new file
        $path = $request->file('thumbnail')->store('thumbnails', 'public');

        // Update event with new thumbnail URL
        $validatedData['thumbnail_url'] = Storage::disk('public')->url($path);
    }

    // Remove the 'thumbnail' key so that the file instance doesn't interfere with the update
    unset($validatedData['thumbnail']);

    // Update the event with the validated data
    $event->update($validatedData);

    return response()->json(["message" => "The event was updated successfully :D"], 200);
}






    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $event = Event::findOrFail($id);

        if (Auth::id() !== $event->user_id) {
            return response()->json(['message' => 'Why are trying to delete an event that is not yours >:('], 403);
        }        

        $event->delete();

        return response()->json(['message' => 'Successfully deleted the event'], 200);
    }
}
