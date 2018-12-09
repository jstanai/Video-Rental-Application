const mongoose = require('mongoose')
const Joi = require('joi');


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

function validateGenre(genre){
  const schema = {
      name: Joi.string().min(3).required()
  };
  console.log(genre)
  return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validateGenre;