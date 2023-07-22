const db = require('../utils/database');

async function seedData() {
  try {
    await db.query('INSERT INTO groceries (item) VALUES ("Item 1"), ("Item 2")');
    console.log('Test data seeded successfully.');
  } catch (error) {
    console.error('Error seeding test data:', error);
  } finally {
    db.end();
  }
}

seedData();