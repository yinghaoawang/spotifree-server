require('dotenv').config();
const db = require('../index');

const alterTables = async () => {
  try {
    await db.tx(async (t) => {
      await t.none(`
        ALTER TABLE users 
        ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      `);

      await t.none(`
       ALTER TABLE videos 
        ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      `);

      await t.none(`
        ALTER TABLE plays 
        ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      `);

      // Add more table creation queries here
    });

    console.log('Tables altered successfully');
  } catch (error) {
    console.error('Error altering tables:', error.message);
  }
};

alterTables();
