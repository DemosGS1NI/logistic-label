<!-- src/routes/login/+page.svelte -->
<script>
    import { page } from '$app/stores';
    import LoginForm from '$lib/components/Auth/LoginForm.svelte';
    
    // Check for return URL and expired token notification
    let returnUrl = $page.url.searchParams.get('returnUrl') || '/dashboard';
    let tokenExpired = $page.url.searchParams.get('expired') === 'true';
  </script>
  
  <svelte:head>
    <title>Login - GS1-128 Logistic Label Generator</title>
    <meta name="description" content="Sign in to your GS1-128 Logistic Label Generator account." />
  </svelte:head>
  
  <div class="max-w-md mx-auto">
    <h1 class="text-2xl font-bold text-center text-gray-900 mb-8">Sign In</h1>
    
    {#if tokenExpired}
      <div class="mb-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md">
        Your session has expired. Please sign in again.
      </div>
    {/if}
    
    <LoginForm {returnUrl} />
  </div>