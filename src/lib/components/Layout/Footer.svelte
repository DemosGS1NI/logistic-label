<!-- src/lib/components/Layout/Footer.svelte -->
<footer class="bg-white mt-auto">
    <div class="max-w-7xl mx-auto py-6 px-4 overflow-hidden sm:px-6 lg:px-8">
      <div class="mt-2 flex justify-center space-x-6">
        <a href="/" class="text-gray-400 hover:text-gray-500">
          <span class="sr-only">Home</span>
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" />
          </svg>
        </a>
        
        <a href="https://gs1.org" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-gray-500">
          <span class="sr-only">GS1 Website</span>
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </a>
        
        <a href="/privacy" class="text-gray-400 hover:text-gray-500">
          <span class="sr-only">Privacy Policy</span>
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
          </svg>
        </a>
      </div>
      <p class="mt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} GS1-128 Logistic Label Generator. All rights reserved.
      </p>
      <p class="mt-1 text-center text-xs text-gray-400">
        This application complies with GS1 standards for barcode generation. GS1 is a registered trademark.
      </p>
    </div>
  </footer>