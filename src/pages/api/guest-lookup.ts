import type { APIRoute } from 'astro';
import { SAMPLE_GUESTS } from '../../lib/guests';

export const GET: APIRoute = async ({ url, locals }) => {
  const code = url.searchParams.get('code');
  
  if (!code) {
    return new Response('Code parameter is required', { status: 400 });
  }
  
  let guest;
  
  // Try to get from KV in production (Cloudflare runtime)
  if ('GUESTS' in locals && locals.GUESTS) {
    try {
      const guestData = await (locals.GUESTS as KVNamespace).get(code.toUpperCase());
      guest = guestData ? JSON.parse(guestData) : null;
    } catch (error) {
      console.error('KV lookup failed:', error);
    }
  }
  
  // Fallback to sample data in development or if KV fails
  if (!guest) {
    guest = SAMPLE_GUESTS.find(g => g.code === code.toUpperCase());
  }
  
  if (!guest) {
    return new Response('Guest not found', { status: 404 });
  }
  
  return new Response(JSON.stringify(guest), {
    headers: { 'Content-Type': 'application/json' }
  });
};
