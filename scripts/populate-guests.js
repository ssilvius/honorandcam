#!/usr/bin/env node

import { SAMPLE_GUESTS } from '../src/lib/guests.js';

// Script to populate Cloudflare KV with guest data
// Run with: node scripts/populate-guests.js

async function populateGuests() {
  console.log('Populating guest data to Cloudflare KV...');
  
  for (const guest of SAMPLE_GUESTS) {
    const command = `wrangler kv:key put --binding=GUESTS "${guest.code}" '${JSON.stringify(guest)}'`;
    console.log(`Adding guest: ${guest.primaryName} (${guest.code})`);
    console.log(command);
  }
  
  console.log('\nTo actually run these commands, copy and paste them or run:');
  console.log('node scripts/populate-guests.js | grep "wrangler kv" | bash');
}

populateGuests();
