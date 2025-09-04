import type { APIRoute } from 'astro';
import { SAMPLE_GUESTS } from '../../lib/guests';

export const GET: APIRoute = async ({ url, locals }) => {
  const code = url.searchParams.get('code');
  
  if (!code) {
    return new Response('Code parameter is required', { status: 400 });
  }
  
  let guest;
  
  // Try to get from KV in production
  if (locals.runtime?.env?.GUESTS) {
    const guestData = await locals.runtime.env.GUESTS.get(code.toUpperCase());
    guest = guestData ? JSON.parse(guestData) : null;
  } else {
    // Fallback to sample data in development
    guest = SAMPLE_GUESTS.find(g => g.code === code.toUpperCase());
  }
  
  if (!guest) {
    return new Response('Guest not found', { status: 404 });
  }
  
  return new Response(JSON.stringify(guest), {
    headers: { 'Content-Type': 'application/json' }
  });
};
