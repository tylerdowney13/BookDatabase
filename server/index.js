// Require express and database
const express = require('express');
const pool = require('./db');

// Assign port
const port = 5000

// Create express app
const app = express();


// MIDDLEWARE
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
})


/// Set up routes for requests///

///GET REQUESTS///

// Inital welcome page
app.get('/', (req, res) => {
    res.json("Welcome to the Books App API")
});

// GET all books
app.get('/books', pool.getBooks);

// GET book by title
app.get("/books/title/:title", pool.getBookByTitle);

// GET book by ISBN
app.get("/books/isbn/:isbn", pool.getBookByIsbn);

// GET books by genre
app.get("/books/genre/:genre", pool.getBookByGenre);

// GET books by author
app.get("/books/author/:author", pool.getBookByAuthor);


/// POST REQUESTS ///
app.post("/books/newbook", pool.createBook);


/// UPDATE REQUESTS ///
app.put("/books/update", pool.updateBook);


/// DELETE REQUESTS ///
app.delete("/books/delete", pool.deleteBook);



// Start app
app.listen(port, () => {
    console.log(`Books App running on port ${port}`)
});