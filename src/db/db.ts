import { Database } from "sqlite3";

export const db = new Database("data.sqlite", (err) => {
  if (err) {
    console.error(err.message);
    // Exit with error
    process.exit(1);
  } else {
    console.log("Connected to the SQLite database.");
  }
});
