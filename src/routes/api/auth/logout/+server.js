// src/routes/api/auth/logout/+server.js
import { json } from '@sveltejs/kit';
import { verifyToken, logUserActivity } from '$lib/server/auth/auth';

export async function POST({ request, cookies }) {
  // Get auth token from cookies
  const token = cookies.get('authToken');
  
  // Check if token exists
  if (token) {
    // Verify token to get user information for audit log
    const user = verifyToken(token);
    
    // Log logout activity if token was valid
    if (user) {
      await logUserActivity(
        user.id,
        'user_logout',
        {},
        request.headers.get('x-forwarded-for') || 'unknown',
        request.headers.get('user-agent')
      );
    }
    
    // Delete the auth cookie
    cookies.delete('authToken', { path: '/' });
  }
  
  return json({ success: true });
}