const {Schema, model} = require('mongoose');

const CitySchema = new Schema({
    name: {type: String, unique: true, required: true},
})

module.exports = model('City', CitySchema);