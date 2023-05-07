const {Schema, model} = require('mongoose');
const mongoose = require("mongoose");

const VacancySchema = new Schema({
    title: {type: String, required: true},
    img: {type: String, required: true},
    price: {type: String, required: true},
    city: {type: mongoose.Schema.Types.ObjectId, ref: 'City'},
    shortDescription: {type: String, required: true},
    fullDescription: {type: String, required: true},
})

module.exports = model('Vacancy', VacancySchema);