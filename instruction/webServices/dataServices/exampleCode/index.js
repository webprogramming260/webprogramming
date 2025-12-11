const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

// Connect to the database cluster
const client = new MongoClient(url);
const db = client.db('rental');
const collection = db.collection('house');

async function main() {
  try {
    // Test that you can connect to the database
    await db.command({ ping: 1 });
    console.log(`DB connected to ${config.hostname}`);
  } catch (ex) {
    console.log(`Error with ${url} because ${ex.message}`);
    process.exit(1);
  }

  try {
    // Insert a document
    const house = {
      name: 'Beachfront views',
      summary: 'From your bedroom to the beach, no shoes required',
      property_type: 'Condo',
      beds: 1,
    };
    await collection.insertOne(house);

    // Query the documents
    const query = { property_type: 'Condo', beds: { $lt: 2 } };
    const options = {
      sort: { name: -1 },
      limit: 10,
    };
    const cursor = collection.find(query, options);
    const rentals = await cursor.toArray();
    rentals.forEach((i) => console.log(i));

    // Delete documents
    await collection.deleteMany(query);

    console.log(`Deleted ${deleteResult.deletedCount} document`);
  } catch (ex) {
    console.log(`Database (${url}) error: ${ex.message}`);
  } finally {
    await client.close();
  }
}

main().then(() => console.log('Done'));
