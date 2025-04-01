<!-- src/routes/signup/+page.svelte -->
<script>
    import SignupForm from '$lib/components/Auth/SignupForm.svelte';
  </script>
  
  <svelte:head>
    <title>Create Account - GS1-128 Logistic Label Generator</title>
    <meta name="description" content="Create a new account to generate GS1-128 compliant logistic labels." />
  </svelte:head>
  
  <div class="max-w-md mx-auto">
    <h1 class="text-2xl font-bold text-center text-gray-900 mb-8">Create an Account</h1>
    
    <SignupForm />
  </div>