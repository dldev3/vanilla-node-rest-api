const Book = require('../models/bookModel');
const { getPostData } = require('../utils');


//@desc get all products
async function getBooks(req,res){
    try {
        const books = await Book.findAll();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(books));
    } catch (error){
        console.log(error);
    }
}
//@desc get single book
async function getBook(req,res,id){
    try {
        const book = await Book.findById(id);
        if(!book){
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message:"Book not found"}));
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(book));
        }
    } catch (error){
        console.log(error);
    }
}

//@desc add book
async function addBook(req, res) {
    try {
       
        const body = await getPostData(req)

        const {
            name,
            author,
            description,
            rating,
            price
        } = JSON.parse(body);

        const book = {
                name ,
                author,
                description,
                rating,
                price
            }

            const newBook = await Book.create(book);
            res.writeHead(201,{ 'Content-Type': 'application/json'});
            return res.end(JSON.stringify(newBook));

    } catch (error){
        console.log(error);
    }
}

//@desc update book
async function updateBook(req, res, id) {
    try {
        const book = await Book.findById(id);
        if (!book) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message:"Book not found"}));
        } else {
            const body = await getPostData(req)

            const {
                name,
                author,
                description,
                rating,
                price
            } = JSON.parse(body);

            const bookData = {
                    name:name || book.name ,
                    author:author || book.author ,
                    description:description || book.description,
                    rating:rating || book.rating ,
                    price:price || book.price ,
                }

            const updBook = await Book.update(id,bookData);
            res.writeHead(200,{ 'Content-Type': 'application/json'});
            return res.end(JSON.stringify(updBook));

        }

    } catch (error){
        console.log(error);
    }
}

//@desc delete
async function deleteBook(req,res,id){
    try {
        const book = await Book.findById(id);
        if(!book){
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message:"Book not found"}));
        } else {
            await Book.remove(id);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Book ${id} removed` }));
        }
    } catch (error){
        console.log(error);
    }
}

module.exports =  {
    getBooks,getBook,addBook, updateBook, deleteBook
}