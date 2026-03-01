const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db(); // Railway MongoDB auto-uses default DB
  }
  return db;
}

module.exports = { connectToDatabase };
