const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connect('mongodb://localhost:27017/BookAPI');

const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({  extended: true }));

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.use('/api/v1', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcom to my nodemon API!');
});

app.listen(port, () => {
  console.log(`Server is running on port  ${port}`);
});