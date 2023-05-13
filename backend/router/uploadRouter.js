const Router = require('express')
const router = new Router()
const fileMiddleware = require("../middleware/file");
const fs = require('fs')

router.post('/image', fileMiddleware.single('image'), (req, res) => {
    try {
        if(req.file) {
            res.json(req.file)
        }
    } catch (e) {
        res.status(500).json({
            message: "ошибка при сохранение фотографии"
        })
    }
})

module.exports = router;