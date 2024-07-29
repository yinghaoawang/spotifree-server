require('dotenv').config();
const db = require('./index');

const createTables = async () => {
  try {
    await db.tx(async (t) => {
      await t.none(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          password TEXT NOT NULL
        );
      `);

      // Add more table creation queries here
    });

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error.message);
  }
};

const recreateTables = async () => {
  try {
    await db.tx(async (t) => {
      await t.none('DROP TABLE IF EXISTS users CASCADE;');
      // Drop other tables if needed

      await createTables();
    });

    console.log('Tables recreated successfully');
  } catch (error) {
    console.error('Error recreating tables:', error.message);
  }
};

const cli = async () => {
  const action = process.argv[2];

  try {
    if (action === 'recreate') {
      console.log('Recreating tables...');
      await recreateTables();
    } else if (action === 'create') {
      console.log('Creating tables...');
      await createTables();
    } else {
      console.log('Invalid action. Use "create" or "recreate".');
      process.exit(1);
    }
    console.log('Operation completed successfully.');
  } catch (error) {
    console.error('Failed to setup database:', error.message);
    process.exit(1);
  }
};

// If the script is run directly from the command line, execute CLI handler
if (require.main === module) {
  cli();
}

module.exports = {
  createTables,
  recreateTables
};
