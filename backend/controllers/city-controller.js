const ApiError = require("../error/ApiError");
const cityService = require('../service/city-service')

class CityController {
    async create(req, res, next){
        try {
            const {name} = req.body
            await cityService.create(name)
            return res.json({success: true});
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res, next){
        try {
            const citiesData = await cityService.getAll()
            return res.json(citiesData);
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new CityController();