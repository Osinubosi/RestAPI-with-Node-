/* eslint-disable no-param-reassign */

const express = require('express');

function routes(Book) {
  const bookRouter = express.Router();
  bookRouter.route('/books')
    .post((req, res) => {
      const book = new Book(req.body);
      book.save();
      return res.status(201).json(book);
    })
    .get((req, res) => {
      const query = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      Book.find(query, (err, books) => {
        if (err) {
          return res.send(err);
        }
        return res.json(books);

      });

    });
  bookRouter.use('/books/:bookId', (req, res, next) => {
    const query = {};

    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }

      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);

    });

  })
  bookRouter.route('/books/:bookId')
    .get((req, res) => {
      res.json(req.book);
    })
    .put((req, res) => {
        const book = {req};
        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.title;
        book.read = req.body.read;

        book.save(());
        return res.json(book);

      })
      .patch((req,res) => {
        const book = {req};
        if(req.body._id){
          delete req.body_id;
        }
        Object.entries(req.body).forEach((item) => {
          const key = item[0];
          const value = item[1];
          book[key] = value;
        })
      })
    

  return bookRouter;
}

module.exports = routes;