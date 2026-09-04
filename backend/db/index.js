// db/index.js
const Database = require("better-sqlite3");
const path = require("path");

// create single shared instance
const db = new Database(path.join(__dirname, "../database.db"), {});

console.log("SQLite connected");

db.exec(`
CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY,
    post TEXT,
    views INTEGER,
    likes INTEGER
);
`)

module.exports = db;