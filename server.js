const http = require('http');
const  {getBooks, getBook, addBook, updateBook, deleteBook } = require('./controllers/bookController');

const server = http.createServer((req, res) => { 
    if (req.url == '/api/books' && req.method == 'GET') {
        getBooks(req,res)
    }  else if (req.url.match(/\/api\/books\/([0-9]+)/) && req.method == 'GET') {
        const id = req.url.split('/')[3];
        getBook(req,res,id);
    } else if (req.url === '/api/books' && req.method == 'POST') {
        addBook(req,res);
    } else if (req.url.match(/\/api\/books\/([0-9]+)/) && req.method == 'PUT') {
        const id = req.url.split('/')[3];
        updateBook(req, res, id);
    } else if (req.url.match(/\/api\/books\/([0-9]+)/) && req.method == 'DELETE') {
        const id = req.url.split('/')[3];
        deleteBook(req, res, id);
    }
    else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: "Not Found"}));
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});