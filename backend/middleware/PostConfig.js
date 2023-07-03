const multer = require('multer')

const ProfileStorage = multer.diskStorage({
    destination: './public/Profilephoto', //directory (folder) setting
    filename: (req, file, cb) => {
        cb(null,  Date.now() + file.originalname ) // file name setting
    }
});

let uploadProfile = multer({
    storage: ProfileStorage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == 'image/jpeg' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/png'
        ) {
            cb(null, true)
        }
        else {
            cb(null, false);
            cb(new Error('Only jpeg,  jpg , png, and gif Image allow'))
        }
    }
});

module.exports = {uploadProfile};