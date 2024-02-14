import { Database } from "sqlite3";

const DATABASE_FILE = process.env.DATABASE_FILE || "data.sqlite";

export const db = new Database(DATABASE_FILE, (err) => {
  if (err) {
    console.error(err.message);
    // Exit with error
    process.exit(1);
  } else {
    console.log("Connected to the SQLite database.");
  }
});
