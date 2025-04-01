// src/routes/api/auth/signup/+server.js
import { json } from '@sveltejs/kit';
import { registerUser, logUserActivity } from '$lib/server/auth/auth';
import { authRateLimiter } from '$lib/server/auth/ratelimit';
import { validateRegistrationForm } from '$lib/server/validation/formValidation';

export async function POST({ request }) {
  // Apply rate limiting
  const rateLimitResponse = authRateLimiter(request);
  if (rateLimitResponse) return rateLimitResponse;
  
  try {
    const userData = await request.json();
    
    // Validate form data
    const validation = validateRegistrationForm(userData);
    if (!validation.isValid) {
      return json(
        { 
          success: false, 
          message: 'Invalid form data', 
          errors: validation.errors 
        }, 
        { status: 400 }
      );
    }
    
    // Register the user
    const user = await registerUser(userData);
    
    // Log user registration
    await logUserActivity(
      user.id,
      'user_registered',
      { email: user.email, username: user.username },
      request.headers.get('x-forwarded-for') || 'unknown',
      request.headers.get('user-agent')
    );
    
    return json({ 
      success: true,
      message: 'Account created successfully',
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Check for duplicate email/username errors
    if (error.message.includes('already registered') || error.message.includes('already taken')) {
      return json(
        { 
          success: false, 
          message: error.message 
        }, 
        { status: 409 }
      );
    }
    
    return json(
      { 
        success: false, 
        message: 'Failed to create account. Please try again.' 
      }, 
      { status: 500 }
    );
  }
}