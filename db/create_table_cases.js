const sql = require('sqlite3').verbose();

const db = new sql.Database('db/base.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS cases (
      case_id INT PRIMARY KEY,
      name TEXT,
      price INT,
      rarity TEXT,
      file BLOB)
      `);
});

db.close();
