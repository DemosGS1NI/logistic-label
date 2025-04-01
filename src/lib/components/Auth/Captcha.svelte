<!-- src/lib/components/Auth/Captcha.svelte -->
<script>
    import { onMount, createEventDispatcher } from 'svelte';
    
    // Event dispatcher for notifying parent about verification
    const dispatch = createEventDispatcher();
    
    // Props
    export let siteKey = '6LcXXXXXXXXXXXXXXXXXXXX'; // Replace with your actual reCAPTCHA site key
    
    // State
    let captchaLoaded = false;
    let captchaId = null;
    
    // Load the reCAPTCHA script
    onMount(() => {
      // Skip this in SSR
      if (typeof window === 'undefined') return;
      
      // Check if reCAPTCHA script is already loaded
      if (window.grecaptcha) {
        captchaLoaded = true;
        renderCaptcha();
        return;
      }
      
      // Create a script element to load reCAPTCHA
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=explicit`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        captchaLoaded = true;
        renderCaptcha();
      };
      
      document.head.appendChild(script);
      
      // Clean up on component unmount
      return () => {
        if (captchaId !== null && window.grecaptcha) {
          window.grecaptcha.reset(captchaId);
        }
      };
    });
    
    // Render the captcha when the script is loaded
    function renderCaptcha() {
      if (!captchaLoade