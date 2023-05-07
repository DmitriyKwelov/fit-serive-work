const Router = require('express')
const cityController = require("../controllers/city-controller");
const router = new Router()


router.post('/create', cityController.create);
router.get('/', cityController.getAll);

module.exports = router