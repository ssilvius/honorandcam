import type { APIRoute } from 'astro';
import { RSVPSchema } from '../../lib/guests';

export const POST: APIRoute = async ({ request }) => {
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
    
    // In production, save to Cloudflare KV:
    // await env.RSVPS.put(validatedData.code, JSON.stringify(validatedData));
    
    // For now, just log it
    console.log('RSVP Received:', validatedData);
    
    return new Response('RSVP submitted successfully!', { status: 200 });
    
  } catch (error) {
    console.error('RSVP submission error:', error);
    return new Response('Invalid RSVP data', { status: 400 });
  }
};
