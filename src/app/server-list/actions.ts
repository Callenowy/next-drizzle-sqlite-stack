'use server';
import { db } from '@/db/db';
import { servers } from '@/db/schema/servers';

export const getServerList = () => db.select().from(servers).all();
