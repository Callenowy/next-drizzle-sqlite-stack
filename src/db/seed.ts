import { getAlpha2Code, registerLocale } from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';
import { faker } from '@faker-js/faker';

import { db } from './db';
import { servers } from './schema/servers';
import type { InsertServer } from './schema/servers';

registerLocale(en);

const serversSeed = (serverCount: number): InsertServer[] => {
  const servers = Array.from({ length: serverCount }).map(() => {
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

  return faker.helpers.shuffle(servers.flat());
};

const seed = serversSeed(16);

const seedDB = async () => {
  console.log('🌱 Seeding...');
  console.time(
    `🌱 Database has been seeded. Created ${seed.length} servers...`
  );
  await db.insert(servers).values(seed);
  console.timeEnd(
    `🌱 Database has been seeded. Created ${seed.length} servers...`
  );
};

seedDB().catch(e => {
  console.error(e);
  process.exit(1);
});
