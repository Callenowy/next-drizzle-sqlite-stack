import { getAlpha2Code, registerLocale } from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';
import { faker } from '@faker-js/faker';

import { db } from './db';
import { servers } from './schema/servers';

import type { InsertServer } from './schema/servers';
registerLocale(en);

const serversSeed = Array.from({ length: 16 }).map(() => {
  const country = faker.location.country();
  const countryCode = getAlpha2Code(country, 'en');
  const numLocations = faker.number.int({ min: 1, max: 5 });
  const locations = [];

  for (let i = 0; i < numLocations; i++) {
    const name = `${country} #${i + 1}`;
    const distance = faker.number.int({ min: 50, max: 1500 });

    locations.push({
      name,
      countryCode,
      distance,
    });
  }

  return locations;
});

const list: InsertServer[] = faker.helpers.shuffle(serversSeed.flat());

const seedDB = async () => {
  console.log('Seed start');
  await db.insert(servers).values(list);
  console.log(`Seed end: ${list.length} servers inserted`);
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
seedDB();
