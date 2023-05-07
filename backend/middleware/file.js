const multer = require('multer');

const typesImage = ['image/png', 'image/jpeg', 'image/jpg']
const typesAudio = ['audio/mpeg']

const storage = multer.diskStorage({
    destination(req, file, cd) {
        console.log(file)
        if(typesImage.includes(file.mimetype)){
            cd(null, 'uploads/images')
        } else if(typesAudio.includes(file.mimetype)){
            cd(null, 'uploads/audio')
        } else {
            cd(null, 'uploads/any')
        }
    },
    filename(req, file, cd){
        console.log(file)
        cd(null, Date.now() + "-" + file.originalname)
    }
})

module.exports = multer({storage})