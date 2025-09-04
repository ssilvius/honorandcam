import Sqids from 'sqids';
import { z } from 'zod';

const sqids = new Sqids({
  minLength: 6,
  alphabet: 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Removed confusing chars
});

export const GuestSchema = z.object({
  id: z.string(),
  code: z.string(),
  primaryName: z.string(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  guestNames: z.array(z.string()),
  maxGuests: z.number(),
  notes: z.string().optional(),
});

export const RSVPSchema = z.object({
  code: z.string(),
  attending: z.boolean(),
  guestCount: z.number(),
  guestNames: z.array(z.string()),
  dietaryRestrictions: z.string().optional(),
  songRequest: z.string().optional(),
  notes: z.string().optional(),
  submittedAt: z.string(),
});

export type Guest = z.infer<typeof GuestSchema>;
export type RSVP = z.infer<typeof RSVPSchema>;

// Generate SQID from string hash
export function generateCode(input: string): string {
  const hash = Array.from(input.toLowerCase())
    .reduce((hash, char) => {
      const charCode = char.charCodeAt(0);
      hash = ((hash << 5) - hash) + charCode;
      return hash & hash; // Convert to 32-bit integer
    }, 0);
  
  return sqids.encode([Math.abs(hash) % 1000000]);
}

// Sample guest list - replace with your actual guests
export const SAMPLE_GUESTS: Guest[] = [
  {
    id: '1',
    code: generateCode('john.doe@email.com'),
    primaryName: 'John Doe',
    email: 'john.doe@email.com',
    address: '123 Main St, City, State',
    guestNames: ['John Doe', 'Jane Doe'],
    maxGuests: 2,
    notes: 'Vegetarian'
  },
  {
    id: '2', 
    code: generateCode('alice.smith@email.com'),
    primaryName: 'Alice Smith',
    email: 'alice.smith@email.com',
    address: '456 Oak Ave, City, State',
    guestNames: ['Alice Smith'],
    maxGuests: 1,
  },
  {
    id: '3',
    code: generateCode('bob.family@email.com'),
    primaryName: 'Bob Johnson Family',
    email: 'bob.family@email.com',
    address: '789 Pine Rd, City, State',
    guestNames: ['Bob Johnson', 'Sarah Johnson', 'Little Bobby', 'Emma Johnson'],
    maxGuests: 4,
    notes: 'Kids meals needed'
  }
];
