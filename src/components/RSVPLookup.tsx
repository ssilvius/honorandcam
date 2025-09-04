import { useState, useActionState } from 'react';
import { type Guest, type RSVP } from '../lib/guests';

interface RSVPLookupProps {}

async function lookupGuest(code: string): Promise<Guest | null> {
  try {
    const response = await fetch(`/api/guest-lookup?code=${code}`);
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Guest lookup failed:', error);
    return null;
  }
}

async function submitRSVP(prevState: any, formData: FormData) {
  try {
    const response = await fetch('/api/rsvp', {
      method: 'POST',
      body: formData,
    });
    
    if (response.ok) {
      return { success: true, message: 'RSVP submitted successfully!' };
    } else {
      const error = await response.text();
      return { success: false, message: error || 'Failed to submit RSVP' };
    }
  } catch (error) {
    return { success: false, message: 'Network error occurred' };
  }
}

export default function RSVPLookup({}: RSVPLookupProps) {
  const [code, setCode] = useState('');
  const [guest, setGuest] = useState<Guest | null>(null);
  const [looking, setLooking] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [guestNames, setGuestNames] = useState<string[]>([]);
  const [state, formAction, isPending] = useActionState(submitRSVP, null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    
    setLooking(true);
    setLookupError('');
    
    const foundGuest = await lookupGuest(code.toUpperCase().trim());
    
    if (foundGuest) {
      setGuest(foundGuest);
      setGuestNames(foundGuest.guestNames);
    } else {
      setLookupError('Invalid code. Please check your invitation and try again.');
    }
    
    setLooking(false);
  };

  const updateGuestName = (index: number, name: string) => {
    const newNames = [...guestNames];
    newNames[index] = name;
    setGuestNames(newNames);
  };

  const addGuest = () => {
    if (guestNames.length < (guest?.maxGuests || 0)) {
      setGuestNames([...guestNames, '']);
    }
  };

  const removeGuest = (index: number) => {
    if (guestNames.length > 1) {
      setGuestNames(guestNames.filter((_, i) => i !== index));
    }
  };

  if (!guest) {
    return (
      <div className="space-y-6">
        <form onSubmit={handleLookup} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
              Invitation Code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 6-character code"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 uppercase"
              maxLength={6}
              required
            />
            {lookupError && (
              <p className="mt-2 text-sm text-red-600">{lookupError}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={looking || !code.trim()}
            className="w-full bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {looking ? 'Looking up...' : 'Find My Invitation'}
          </button>
        </form>
        
        <div className="text-center text-sm text-gray-600">
          <p>Don't have a code? Contact us at [your-email]</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Welcome!</h3>
        <p className="text-gray-600">
          We found your invitation for: <strong>{guest.primaryName}</strong>
        </p>
        {guest.address && (
          <p className="text-sm text-gray-500 mt-1">{guest.address}</p>
        )}
      </div>

      {state?.success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">{state.message}</p>
        </div>
      )}

      {state && !state.success && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{state.message}</p>
        </div>
      )}

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="code" value={guest.code} />
        
        {/* Attendance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Will you be attending? *
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="attending"
                value="true"
                required
                className="mr-2 text-rose-600"
              />
              <span>Yes, we'll be there! 🎉</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="attending"
                value="false"
                required
                className="mr-2 text-rose-600"
              />
              <span>Sorry, can't make it 😢</span>
            </label>
          </div>
        </div>

        {/* Guest Names */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Guest Names (up to {guest.maxGuests})
          </label>
          <div className="space-y-2">
            {guestNames.map((name, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => updateGuestName(index, e.target.value)}
                  placeholder={`Guest ${index + 1} name`}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                />
                {guestNames.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeGuest(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            
            {guestNames.length < guest.maxGuests && (
              <button
                type="button"
                onClick={addGuest}
                className="text-rose-600 hover:text-rose-700 text-sm"
              >
                + Add another guest
              </button>
            )}
          </div>
          <input type="hidden" name="guestNames" value={JSON.stringify(guestNames)} />
          <input type="hidden" name="guestCount" value={guestNames.length} />
        </div>

        {/* Dietary Restrictions */}
        <div>
          <label htmlFor="dietary" className="block text-sm font-medium text-gray-700 mb-2">
            Dietary Restrictions or Allergies
          </label>
          <textarea
            id="dietary"
            name="dietaryRestrictions"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="Let us know about any dietary needs..."
          />
        </div>

        {/* Song Request */}
        <div>
          <label htmlFor="song" className="block text-sm font-medium text-gray-700 mb-2">
            Song Request
          </label>
          <input
            type="text"
            id="song"
            name="songRequest"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="Request a song for the reception!"
          />
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="Anything else you'd like us to know?"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-rose-600 text-white py-3 px-4 rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isPending ? 'Submitting...' : 'Submit RSVP'}
        </button>
      </form>

      <button
        onClick={() => {
          setGuest(null);
          setCode('');
          setLookupError('');
        }}
        className="w-full text-gray-600 hover:text-gray-800 text-sm"
      >
        ← Use a different code
      </button>
    </div>
  );
}
