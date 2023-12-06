const sql = require('sqlite3').verbose();

const db = new sql.Database('db/base.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      user_id INT PRIMARY KEY,
      balance INT,
      cards TEXT,
      cases TEXT,
      friends TEXT)
      `);
});

db.close();
