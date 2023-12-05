const sql = require('sqlite3').verbose();

const db = new sql.Database('db/base.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS cards (
      card_id INT PRIMARY KEY,
      name TEXT,
      rarity TEXT,
      price INT,
      file BLOB)
      `);
});

db.close();
