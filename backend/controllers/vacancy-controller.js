const ApiError = require("../error/ApiError");
const vacancyService = require('../service/vacancy-service')

class VacancyController {
    async create(req, res, next){
        try {
            const {title, img, city, price, shortDescription, fullDescription} = req.body
            await vacancyService.create(title, img, city, price, shortDescription, fullDescription)
            return res.json({success: true});
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
    async updateById(req, res, next){
        try {
            const {id, title, img, city, price, shortDescription, fullDescription} = req.body
            await vacancyService.updateById(id, title, img, city, price, shortDescription, fullDescription)
            return res.json({success: true});
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res, next){
        try {
            const vacanciesData = await vacancyService.getAll()
            return res.json(vacanciesData);
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
    async getById(req, res, next){
        try {
            const {id} = req.params
            const vacancyData = await vacancyService.getById(id)
            return res.json(vacancyData);
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
    async getByCityId(req, res, next){
        try {
            const {id} = req.params
            const vacancyData = await vacancyService.getByCityId(id)
            return res.json(vacancyData);
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
    async deleteById(req, res, next){
        try {
            const {id} = req.params
            await vacancyService.deleteById(id)
            return res.json({success: true});
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new VacancyController();