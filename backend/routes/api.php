<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;

//get info about user.
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Events
Route::get('/events', [EventController::class, 'index']); // Public route for guest users, with search.
Route::get('/events/{event}', [EventController::class, 'show']); // Public route for event details.

Route::middleware('auth:sanctum')->post('/events', [EventController::class, 'store']); // Authenticated users can create events.
Route::middleware('auth:sanctum')->post('/events/{event}/join', [EventController::class, 'join']); // Authenticated users can join events.
Route::middleware('auth:sanctum')->delete('/events/{event}', [EventController::class, 'destroy']); // Authenticated users can delete their events.
Route::middleware('auth:sanctum')->put('/events/{event}', [EventController::class, 'update']); // Authenticated users can edit their events.
Route::middleware('auth:sanctum')->get('user/events/', [EventController::class, 'getEvents']); // Authenticated users can see which events they joined or hosted.


// Register, login, logout, forgot-password, reset-password.
// require __DIR__.'/auth.php';
