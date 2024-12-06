const express = require("express");
const { MongoClient } = require("mongodb");


// MongoDB URI for local connection
const uri = "mongodb://localhost:27017/Users";

// Initialize Express app
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
async function connectToDb() {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Connected to MongoDB");
    return client;
}

// Root route (GET /)
app.get("/", (req, res) => {
    res.send("Hello, this is the root route!");
});

// Books route (POST /books) to insert a book
app.post("/books", async (req, res) => {
    const client = await connectToDb();
    const db = client.db("myDB");
    const collection = db.collection("books");

    const book = req.body; // Get the book data from the request body

    try {
        const result = await collection.insertOne(book); // Insert book into the collection
        res.status(201).send(`Book added with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error inserting book: " + err);
    } finally {
        await client.close(); // Close the MongoDB connection
    }
});

// Books route (GET /books) to fetch all books
app.get("/books", async (req, res) => {
    const client = await connectToDb();
    const db = client.db("myDB");
    const collection = db.collection("books");

    try {
        const books = await collection.find().toArray(); // Fetch all books from the database
        res.status(200).json(books); // Send the books data as JSON
    } catch (err) {
        res.status(500).send("Error fetching books: " + err);
    } finally {
        await client.close(); // Close the MongoDB connection
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
