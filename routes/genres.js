const mongoose = require('mongoose')
const Joi = require('joi');
const express = require('express');
const router = express.Router();

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
})

const Genre = mongoose.model('Genre', genreSchema)

async function createGenre(id, name) {
    const genre = new Genre({
        name: name,
        id: id
    })

    try {
        const result = await genre.save()
        console.log(result)
    } catch (err) {
        console.log(err.errors)
    }
}

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name')
    res.send(genres)
});

router.post('/', async (req, res) => {

    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    console.log(genre)
    genre = await genre.save()
    res.send(genre);

});

router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body) 
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, {new: true})

    if(!genre) return res.status(404).send('Genre not found');
    res.send(genre);

});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(eq.params.id)
   
    if(!genre) return res.status(404).send('The course was not found');
    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if(!genre) return res.status(404).send('The Course with the given ID was not found');
    res.send(genre);
});

function validateGenre(genre){
    const schema = {
        name: Joi.string().min(3).required()
    };
    console.log(genre)
    return Joi.validate(genre, schema);
}

module.exports = router;