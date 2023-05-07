const CityDto = require('./city-dto')

module.exports = class VacancyDto {
    title;
    img;
    price;
    shortDescription;
    fullDescription;
    city;
    id;

    constructor(model) {
        this.title = model.title;
        this.img = model.img;
        this.city = new CityDto(model.city)
        this.price = model.price;
        this.shortDescription = model.shortDescription;
        this.fullDescription = model.fullDescription;
        this.id = model._id;
    }
}