import type { APIRoute } from 'astro';
import { RSVPSchema } from '../../lib/guests';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const formData = await request.formData();
    
    const rsvpData = {
      code: formData.get('code') as string,
      attending: formData.get('attending') === 'true',
      guestCount: parseInt(formData.get('guestCount') as string),
      guestNames: JSON.parse(formData.get('guestNames') as string),
      dietaryRestrictions: formData.get('dietaryRestrictions') as string || undefined,
      songRequest: formData.get('songRequest') as string || undefined,
      notes: formData.get('notes') as string || undefined,
      submittedAt: new Date().toISOString(),
    };
    
    // Validate the data
    const validatedData = RSVPSchema.parse(rsvpData);
    
    // Save to KV in production (Cloudflare runtime)
    if ('RSVPS' in locals && locals.RSVPS) {
      try {
        await (locals.RSVPS as KVNamespace).put(validatedData.code, JSON.stringify(validatedData));
      } catch (error) {
        console.error('KV storage failed:', error);
      }
    } else {
      // Log in development
      console.log('RSVP Received:', validatedData);
    }
    
    return new Response('RSVP submitted successfully!', { status: 200 });
    
  } catch (error) {
    console.error('RSVP submission error:', error);
    return new Response('Invalid RSVP data', { status: 400 });
  }
};
