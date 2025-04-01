<!-- src/lib/components/Layout/ProtectedRoute.svelte -->
<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    
    // Check for auth token and redirect if not found
    onMount(() => {
      // Skip this check on the server
      if (typeof window === 'undefined') return;
      
      // Check if we're already on the login page
      if ($page.url.pathname === '/login') return;
      
      // Check for the auth token in local storage
      const token = localStorage.getItem('authToken');
      
      // If no token, redirect to login
      if (!token) {
        // Store the current path to redirect back after login
        const returnUrl = $page.url.pathname + $page.url.search;
        goto(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
      }
    });
  </script>
  
  <slot />