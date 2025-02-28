<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
{
    $request->authenticate();    

    // Create and return Sanctum token
    $user = Auth::user();
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Login successful',
        'user' => $user,
        'token' => $token,
        'token_type' => 'Bearer'
    ], 200);
}


    /**
     * Destroy an authenticated session.
     */
   public function destroy(Request $request): JsonResponse {
    if ($request->user()) {
        // Revoke all API tokens
        $request->user()->tokens()->delete();
    }

    // Logout the user
    Auth::guard('web')->logout();
    
    // Invalidate session
    $request->session()->invalidate();
    $request->session()->regenerateToken();    

    return response()->json(['message' => 'Logged out successfully'], 200);
}


}
