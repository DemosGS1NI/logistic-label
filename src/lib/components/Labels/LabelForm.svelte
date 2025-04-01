<!-- src/lib/components/Labels/LabelForm.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
    import { validateLabelForm } from '$lib/server/validation/formValidation';
    
    // Event dispatcher
    const dispatch = createEventDispatcher();
    
    // Props
    export let initialData = {
      gtin: '',
      lot_number: '',
      production_date: '',
      quantity: '',
      weight_pounds: ''
    };
    
    // Form state
    let formData = { ...initialData };
    let isLoading = false;
    let errors = {};
    let formError = '';
    
    // Set today's date as default for production date
    if (!formData.production_date) {
      const today = new Date();
      formData.production_date = today.toISOString().split('T')[0];
    }
    
    // Handle form submission
    async function handleSubmit() {
      // Client-side validation
      const validation = validateLabelForm(formData);
      
      if (!validation.isValid) {
        errors = validation.errors;
        return;
      }
      
      isLoading = true;
      formError = '';
      errors = {};
      
      try {
        // Dispatch the submit event with form data
        dispatch('submit', formData);
      } catch (error) {
        console.error('Form submission error:', error);
        formError = 'An unexpected error occurred. Please try again.';
      } finally {
        isLoading = false;
      }
    }
    
    // Reset the form
    function resetForm() {
      formData = { ...initialData };
      errors = {};
      formError = '';
    }
  </script>
  
  <form on:submit|preventDefault={handleSubmit} class="space-y-6 bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-6">Create GS1-128 Logistic Label</h2>
    
    {#if formError}
      <div class="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
        {formError}
      </div>
    {/if}
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- GTIN Field -->
      <div>
        <label for="gtin" class="block text-sm font-medium text-gray-700 mb-1">
          GTIN (14 digits)
        </label>
        <input
          type="text"
          id="gtin"
          bind:value={formData.gtin}
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="00123456789012"
          maxlength="14"
          pattern="[0-9]{14}"
          required
        />
        {#if errors.gtin}
          <p class="mt-1 text-sm text-red-600">{errors.gtin}</p>
        {/if}
        <p class="mt-1 text-xs text-gray-500">
          Enter the 14-digit Global Trade Item Number
        </p>
      </div>
      
      <!-- Lot Number Field -->
      <div>
        <label for="lot_number" class="block text-sm font-medium text-gray-700 mb-1">
          Lot Number
        </label>
        <input
          type="text"
          id="lot_number"
          bind:value={formData.lot_number}
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="LOT123ABC"
          maxlength="20"
          required
        />
        {#if errors.lot_number}
          <p class="mt-1 text-sm text-red-600">{errors.lot_number}</p>
        {/if}
        <p class="mt-1 text-xs text-gray-500">
          Enter the batch or lot number (alphanumeric, max 20 chars)
        </p>
      </div>
      
      <!-- Production Date Field -->
      <div>
        <label for="production_date" class="block text-sm font-medium text-gray-700 mb-1">
          Production Date
        </label>
        <input
          type="date"
          id="production_date"
          bind:value={formData.production_date}
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        {#if errors.production_date}
          <p class="mt-1 text-sm text-