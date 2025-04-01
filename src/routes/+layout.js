// src/routes/+layout.js
import { browser } from '$app/environment';
import { goto } from '$app/navigation';

// Pages that don't require authentication
const publicPages = ['/', '/login', '/signup', '/reset-password', '/privacy'];

export const load = async ({ url }) => {
  // Skip auth check on the server
  if (!browser) return {};

  const path = url.pathname;
  
  // Check if current path is a public page
  const isPublicPage = publicPages.some(page => 
    path === page || path.startsWith(page + '/')
  );
  
  // If it's a public page, no need to check auth
  if (isPublicPage) return {};
  
  // Check if user is authenticated
  const token = localStorage.getItem('authToken');
  
  // If no token and not on a public page, redirect to login
  if (!token) {
    goto(`/login?returnUrl=${encodeURIComponent(path)}`);
    return {};
  }
  
  // Check if token is expired
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = payload.exp * 1000; // Convert to milliseconds
    
    if (Date.now() >= expiryTime) {
      // Token expired
      localStorage.removeItem('authToken');
      goto(`/login?returnUrl=${encodeURIComponent(path)}&expired=true`);
      return {};
    }
  } catch (error) {
    console.error('Error parsing auth token:', error);
    localStorage.removeItem('authToken');
    goto(`/login?returnUrl=${encodeURIComponent(path)}`);
    return {};
  }
  
  // User is authenticated
  return {};
};