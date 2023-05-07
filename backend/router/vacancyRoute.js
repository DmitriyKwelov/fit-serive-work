const Router = require('express')
const vacancyController = require("../controllers/vacancy-controller");
const router = new Router()


router.post('/create', vacancyController.create);
router.get('/', vacancyController.getAll);
router.get('/:id', vacancyController.getById);
router.post('/update', vacancyController.updateById);
router.get('/city/:id', vacancyController.getByCityId);
router.delete('/:id', vacancyController.deleteById);

module.exports = router