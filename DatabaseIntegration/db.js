const { MongoClient } = require("mongodb");

// Replace the placeholder with your local MongoDB connection string
const uri = "mongodb://localhost:27017/";

async function insertData() {
    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB server
        await client.connect();

        // Access the database and collection
        const db = client.db("myDB");
        const collection = db.collection("books");

        // Sample data for books
        const books = [
            { title: "To Kill a Mockingbird", author: "Harper Lee", price: 10.99 },
            { title: "1984", author: "George Orwell", price: 8.99 },
            { title: "Moby Dick", author: "Herman Melville", price: 12.99 }
        ];

        // Insert the data
        const result = await collection.insertMany(books);
        console.log(`${result.insertedCount} documents inserted:`, result.insertedIds);
    } catch (err) {
        console.error('Error inserting data:', err);
    } finally {
        // Close the connection
        await client.close();
    }
}

async function fetchAllData() {
    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB server
        await client.connect();

        // Access the database and collection
        const db = client.db("myDB");
        const collection = db.collection("books");

        // Fetch all documents from the collection
        const data = await collection.find().toArray();

        // Print the data
        console.log(data);
    } catch (err) {
        console.error('Error fetching data:', err);
    } finally {
        // Close the connection
        await client.close();
    }
}

// Execute the functions sequentially
async function run() {
    await insertData(); // Insert data first
    await fetchAllData(); // Fetch data after insertion
}

// Run the function
run();
