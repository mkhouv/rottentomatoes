const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const PORT = 8080;

app.use(express.static(path.join(__dirname, '../')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/movies/:movieid', (req, res) => {
  fs.readFile(path.join(__dirname + '/take-home-movie.json'), 'utf-8', (err, response) => {
    res.json(JSON.parse(response));
  });
});

app.get('/articles', (req, res) => {
  fs.readFile(path.join(__dirname + '/take-home-articles.json'), 'utf-8', (err, response) => {
    res.json(JSON.parse(response));
  });
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));