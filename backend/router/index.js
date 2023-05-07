const Router = require('express').Router;
const userRouter = require('./userRouter')
const cityRouter = require('./cityRouter')
const vacancyRouter = require('./vacancyRoute')
const uploadRouter = require('./uploadRouter')
const router = new Router();

router.use('', userRouter)
router.use('/city', cityRouter)
router.use('/vacancy', vacancyRouter)
router.use('/upload', uploadRouter)

module.exports = router;