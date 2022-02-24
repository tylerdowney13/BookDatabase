// Read and parse configuration data
const fs = require('fs');

var configData = fs.readFileSync('config.json', (err, data) => {
    return data;
});

const config = JSON.parse(configData);


// Create connection to pg database
const Pool = require("pg").Pool;
const db = new Pool(config);


/// FUNCTIONS ///
const checkRarity = (title) => {
    const LinkedList = require('./linkedList')

    const testLink = new LinkedList.LinkedList();

    var json = JSON.parse(require('fs').readFileSync('rare.json', 'utf8'));

    json.forEach(obj => {
        testLink.insertFirst(obj);
    })
    
    for (var i = 0; i <= testLink.size() -1; i++) {
        testString = testLink.getElementAt(i).element;
        var bookTitle = testString['Title'];
        var bookRarity = testString['Rarity']
        if (bookTitle === title) {
            return bookRarity;
        }
    }
    return "Common"
}


// Database routing

// GET requests
const getBooks = async (req, res) => {
    try {
        const books = await db.query(
            "SELECT * FROM books JOIN authors ON books.author_id = authors.author_id JOIN genres ON books.genre_id = genres.genre_id ORDER BY title ASC"
        )
        res.json(books.rows);

    } catch (error) {
        console.error(error.message);
    }
}

const getBookByTitle = async(req, res) => {
    try {
        const { title } = req.params;
        const booksByTitle = await db.query("SELECT * FROM books JOIN authors ON books.author_id = authors.author_id JOIN genres ON books.genre_id = genres.genre_id WHERE title = $1", [title]);
        res.json(booksByTitle.rows);
    } catch (error) {
        console.error(error.message);
    }
}

const getBookByIsbn = async(req, res) => {
    try {
        const { isbn } = req.params;
        const bookByISBN = await db.query("SELECT * FROM books JOIN authors ON books.author_id = authors.author_id JOIN genres ON books.genre_id = genres.genre_id WHERE books.isbn = $1", [isbn]);
        res.json(bookByISBN.rows);
    } catch (error) {
        console.error(error.message);
    }
}

const getBookByGenre = async(req, res) => {
    try {
        const { genre } = req.params;
        const bookByGenre = await db.query("SELECT * FROM books JOIN authors ON books.author_id = authors.author_id JOIN genres ON books.genre_id = genres.genre_id WHERE genre = $1", [genre]);
        res.json(bookByGenre.rows);
    } catch (error) {
        console.error(error.message);
    }
}

const getBookByAuthor = async(req, res) => {
    try {
        const { author } = req.params;
        const bookByAuthor = await db.query("SELECT * FROM books JOIN authors ON books.author_id = authors.author_id JOIN genres ON books.genre_id = genres.genre_id WHERE author = $1", [author]);
        res.json(bookByAuthor.rows);
    } catch (error) {
        console.error(error.message);
    }
}

const deleteBook = async(req, res) => {
    try {
        const serial_number = req.body.serial_number;
        const deleteBook = await db.query("DELETE FROM books WHERE serial_number = $1", [serial_number]);
        res.json("Book was deleted");
    } catch (error) {
        console.error(error.message);
    }
}

// CREATE New Book
const createBook = async(req, res) => {
    try {
        const bookData = req.body;

        const bookISBN = bookData.isbn;
        const bookTitle = bookData.title;
        const bookSerialNumber = bookData.serial_number;
        const bookCondition = bookData.condition;
        const bookAuthor = bookData.author;
        const bookGenre = bookData.genre;
        const bookRarity = checkRarity(bookTitle);

        var genreId = null;
        var authorId = null;
        

        // Get author_id / create author id if it doesnt exist
        try {
            const bookAuthorId = await db.query("SELECT author_id FROM authors WHERE author = $1", [bookAuthor]);
            authorId = bookAuthorId.rows[0].author_id;
        } catch (error) {
            console.log("Creating new Author")
            const newAuthor = await db.query("INSERT INTO public.authors (author) VALUES ($1)", [bookAuthor])
            const bookAuthorId = await db.query("SELECT author_id FROM authors WHERE author = $1", [bookAuthor]);
            authorId = bookAuthorId.rows[0].author_id;
        } 

        // Get genre_id / create genre_id if it doesn't exist
        try {
            const bookGenreId = await db.query("SELECT genre_id FROM genres WHERE genre = $1", [bookGenre]);
            genreId = bookGenreId.rows[0].genre_id;
        } catch (error) {
            console.log("Creating new genre");
            const newGenre = await db.query("INSERT INTO public.genres (genre) VALUES ($1)", [bookGenre])
            const bookGenreId = await db.query("SELECT genre_id FROM genres WHERE genre = $1", [bookGenre])
            genreId = bookGenreId.rows[0].genre_id;
        }
        res.json({bookISBN, bookTitle, bookSerialNumber, bookCondition, bookRarity, bookAuthor, bookGenre, authorId, genreId});

        const createNewBook = await db.query("INSERT INTO public.books(isbn, title, serial_number, condition, rarity, author_id, genre_id) VALUES ($1, $2, $3, $4, $5, $6, $7)", [bookISBN, bookTitle, bookSerialNumber, bookCondition, bookRarity, authorId, genreId]);

    } catch (error) {
        console.error(error.message);
    } 
}

// UPDATE book
const updateBook = async (req, res) => {
    try {
        const serial_number = req.body.serial_number;
        const bookCondition = req.body.condition;

        const updateBookCondition = await db.query("UPDATE books SET condition = $1 WHERE serial_number = $2", [bookCondition, serial_number])

        res.json(`Book with serial number ${serial_number} condition updated to ${bookCondition}`);
    } catch (error) {
        console.error(error.message);
        res.json("Invalid Serial Number");
    }
}

// Export pool connection and functions
module.exports = {
    db,
    getBooks,
    getBookByTitle,
    getBookByIsbn,
    getBookByGenre,
    getBookByAuthor,
    deleteBook,
    createBook,
    updateBook
}