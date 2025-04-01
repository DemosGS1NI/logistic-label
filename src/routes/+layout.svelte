<!-- src/routes/+layout.svelte -->
<script>
	import Navbar from '$lib/components/Layout/Navbar.svelte';
	import Footer from '$lib/components/Layout/Footer.svelte';
	import '../app.css';
	
	// Get child component
	let { children } = $props();
  </script>
  
  <div class="flex flex-col min-h-screen">
	<Navbar />
	
	<main class="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:px-6 lg:px-8">
	  {@render children()}
	</main>
	
	<Footer />
  </div>