const multer = require('multer');

const typesImage = ['image/png', 'image/jpeg', 'image/jpg']

const storage = multer.diskStorage({
    destination(req, file, cd) {
        if(typesImage.includes(file.mimetype)){
            cd(null, 'uploads/images')
        }
    },
    filename(req, file, cd){
        cd(null, Date.now() + "-" + file.originalname)
    }
})

module.exports = multer({storage})