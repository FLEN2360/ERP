import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { exit } from 'process';

import { auth } from '@/lib/auth';
import { env } from '@/env';

import { roles } from './schema';

async function seed() {
  const email = env.WEB_ADMIN_EMAIL || 'admin@example.com';
  const password = env.WEB_ADMIN_PASSWORD || 'adminpassword';
  const name = env.WEB_ADMIN_USERNAME || 'admin';

  console.log('init...');

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();

  const db = drizzle(client);

  console.log('Seeding initial roles...');
  await db
    .insert(roles)
    .values([
      {
        id: 'user',
        name: '一般使用者',
        permissions: 'read',
      },
      {
        id: 'admin',
        name: '管理員',
        permissions: 'read,write,manage',
      },
    ])
    .onConflictDoNothing({
      target: roles.id,
    });
  console.log('Roles confirmed.');

  console.log('Checking for admin user...');
  try {
    const check = await auth.api.isUsernameAvailable({
      body: {
        username: name,
      },
    });

    if (!check.available) {
      console.log(`Admin user with username ${name} already exists. Skipping creation.`);
      await client.end();
      return;
    }
    console.log('Create admin user...');
    const user = await auth.api.signUpEmail({
      body: {
        email: email,
        password: password,
        name: name,
        username: name,
        displayUsername: name,
        role: 'admin',
      },
    });
    console.log('Admin created:', user);
  }
  catch (error) {
    const errorString = String(error);
    if (errorString.includes('User already exists') || errorString.includes('duplicate')) {
      console.log(`Admin user with email ${email} already exists. Skipping creation.`);
    }
    else {
      console.error('Failed to create admin user:', error);
      await client.end();
      throw error; // 拋出其他類型的錯誤
    }
  }

  console.log('init completed');
  await client.end();
  exit(0);
}

seed();
