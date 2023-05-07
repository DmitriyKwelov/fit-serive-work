module.exports = class CityDto {
    name;
    id;

    constructor(model) {
        this.name = model.name;
        this.id = model._id;
    }
}