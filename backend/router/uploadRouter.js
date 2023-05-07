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
router.post('/audio', fileMiddleware.single('audio'), async (req, res) => {
    try {
        const audioFilePath = `uploads/audio/${req.file.filename}`;
        const mm = await import('music-metadata');
        mm.parseFile(audioFilePath).then(metadata => {
            const durationInSeconds = Math.ceil(metadata.format.duration);
            res.json({filename: req.file.filename, durationSec: durationInSeconds})
        }).catch(err => {
            console.error(err.message);
        });
    } catch (e) {
        res.status(500).json({
            message: "ошибка при сохранение аудио"
        })
    }
})

module.exports = router;