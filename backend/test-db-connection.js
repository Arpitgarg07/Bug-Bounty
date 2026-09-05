// Test PostgreSQL connection with different passwords
const { Client } = require('pg');

const passwords = [
  'YourNewPassword123!',
  'admin123',
  'StrongPassword123',
  'StrongPassword@123',
  'StrongPassword123!',
  'StrongPassword@123!'
];

async function testConnection(password) {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: password,
    database: 'postgres'
  });

  try {
    await client.connect();
    console.log(`✅ SUCCESS! Password is: "${password}"`);
    await client.end();
    return true;
  } catch (err) {
    console.log(`❌ Failed with password: "${password}"`);
    return false;
  }
}

async function testAllPasswords() {
  console.log('Testing PostgreSQL passwords...\n');

  for (const pwd of passwords) {
    const success = await testConnection(pwd);
    if (success) {
      console.log('\n🎉 Found the correct password!');
      console.log(`\nUpdate your .env file with:`);
      console.log(`DATABASE_URL=postgresql://postgres:${pwd}@localhost:5432/bugbounty_db?schema=public`);
      process.exit(0);
    }
  }

  console.log('\n❌ None of the passwords worked.');
  console.log('Please check your pgAdmin4 master password or PostgreSQL installation.');
  process.exit(1);
}

testAllPasswords();
