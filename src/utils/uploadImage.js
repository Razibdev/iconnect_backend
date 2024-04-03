const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'src/public/'); // Save uploaded files to the 'uploads' directory
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Rename the file
    }
});

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/webp'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

// Initialize multer with the storage configuration
const upload = multer({ storage: storage , fileFilter: fileFilter});

module.exports = upload;