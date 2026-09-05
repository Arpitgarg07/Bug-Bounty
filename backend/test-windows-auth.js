// Test PostgreSQL connection without password (Windows auth)
const { Client } = require('pg');

async function testWindowsAuth() {
  console.log('Testing PostgreSQL with Windows Authentication...\n');

  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'postgres'
    // No password - uses Windows authentication
  });

  try {
    await client.connect();
    console.log('✅ SUCCESS! PostgreSQL uses Windows Authentication (no password needed)');
    console.log('\nUpdate your .env file with:');
    console.log('DATABASE_URL=postgresql://postgres@localhost:5432/bugbounty_db?schema=public');
    await client.end();
  } catch (err) {
    console.log('❌ Windows Authentication failed');
    console.log('Error:', err.message);
  }
}

testWindowsAuth();
