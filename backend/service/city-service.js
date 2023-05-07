const CityModel = require('../models/city-model')
const CityDto = require('../dtos/city-dto')

class CityService {
    async create(name){
        const candidate = await CityModel.findOne({name});
        if (candidate) {
            throw new Error(`Город с стаким именем ${name} уже существует`);
        }
        await CityModel.create({name})
    }
    async getAll(){
        const citiesData = await CityModel.find();
        const citiesDto = citiesData.map(city => new CityDto(city));
        console.log(citiesDto)
        return citiesDto
    }
}

module.exports = new CityService();