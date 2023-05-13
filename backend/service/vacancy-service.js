const VacancyModel = require('../models/vacancy-model')
const VacancyDto = require('../dtos/vacancy-dto')
const {ObjectId} = require("mongodb");

class VacancyService {
    async create(title, img, city, price, shortDescription, fullDescription){
        for(let i = 0; i < city.length; i++){
            await VacancyModel.create({title, img, city: city[i], price, shortDescription, fullDescription})
        }
    }
    async updateById(id, title, img, city, price, shortDescription, fullDescription){
        await VacancyModel.updateOne({_id: new ObjectId(id)},{
            title: title,
            img: img,
            city: city,
            price: price,
            shortDescription: shortDescription,
            fullDescription: fullDescription
        });
    }
    async getAll(){
        const vacancyData = await VacancyModel.find().populate(["city"]);
        const vacancyDto = vacancyData.map(vacancy => new VacancyDto(vacancy));
        return vacancyDto
    }
    async getById(id){
        const vacancyData = await VacancyModel.findById(id).populate(["city"]);
        const vacancyDto = new VacancyDto(vacancyData);
        return vacancyDto
    }
    async getByCityId(id){
        const vacancyData = await VacancyModel.find({city: new ObjectId(id)}).populate(["city"]);
        const vacancyDto = vacancyData.map(vacancy => new VacancyDto(vacancy));
        return vacancyDto
    }
    async deleteById(id){
        await VacancyModel.deleteOne({ _id: new ObjectId(id) });;
    }
}

module.exports = new VacancyService();