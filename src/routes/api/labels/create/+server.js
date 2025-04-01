// src/routes/api/labels/create/+server.js
import { json } from '@sveltejs/kit';
import { createLabel } from '$lib/server/db/labels';
import { verifyToken, logUserActivity } from '$lib/server/auth/auth';
import { validateLabelForm, sanitizeLabelForm } from '$lib/server/validation/formValidation';
import { pdfRateLimiter } from '$lib/server/auth/ratelimit';

export async function POST({ request, cookies }) {
  // Apply rate limiting
  const rateLimitResponse = pdfRateLimiter(request);
  if (rateLimitResponse) return rateLimitResponse;
  
  // Get auth token from cookies
  const token = cookies.get('authToken');
  
  // Verify authentication
  if (!token) {
    return json({ success: false, message: 'Authentication required' }, { status: 401 });
  }
  
  const user = verifyToken(token);
  if (!user) {
    return json({ success: false, message: 'Invalid authentication token' }, { status: 401 });
  }
  
  try {
    // Parse label data from request
    const labelData = await request.json();
    
    // Validate form data
    const validation = validateLabelForm(labelData);
    if (!validation.isValid) {
      return json(
        { 
          success: false, 
          message: 'Invalid label data', 
          errors: validation.errors 
        }, 
        { status: 400 }
      );
    }
    
    // Sanitize form data
    const sanitizedData = sanitizeLabelForm(labelData);
    
    // Create label in database
    const label = await createLabel(sanitizedData, user.id);
    
    // Log label creation activity
    await logUserActivity(
      user.id,
      'label_created',
      { 
        label_id: label.id,
        gtin: label.gtin,
        lot_number: label.lot_number
      },
      request.headers.get('x-forwarded-for') || 'unknown',
      request.headers.get('user-agent')
    );
    
    return json({ 
      success: true,
      message: 'Label created successfully',
      label: {
        id: label.id,
        gtin: label.gtin,
        lot_number: label.lot_number,
        production_date: label.production_date,
        quantity: label.quantity,
        weight_pounds: label.weight_pounds,
        sscc: label.sscc,
        created_at: label.created_at
      }
    });
  } catch (error) {
    console.error('Label creation error:', error);
    
    return json(
      { 
        success: false, 
        message: 'Failed to create label. Please try again.' 
      }, 
      { status: 500 }
    );
  }
}