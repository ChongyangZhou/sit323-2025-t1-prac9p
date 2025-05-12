const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

async function main() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    const db = client.db("myappdb");
    const collection = db.collection("test_collection");

    const result = await collection.insertOne({ message: "Hello from Node.js!" });
    console.log("✅ Document inserted:", result.insertedId);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  } finally {
    await client.close();
  }
}

main();
