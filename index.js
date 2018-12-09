const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);


const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');
const movies = require('./routes/movies');

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect', err))


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/rentals', rentals);
app.use('/api/movies', movies);

app.get('/', (req, res) => {
    res.send('Welcome to Vidly');
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Listening on ${port}...`)});