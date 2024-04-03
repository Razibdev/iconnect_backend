const dotenv = require("dotenv");
dotenv.config({
    path: "./src/config.env",
});

const aws = require('aws-sdk');
const multer = require('multer');
const path = require('path');
const multerS3 = require('multer-s3');
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

const s3 = new aws.S3({
    endpoint: process.env.DIGITALOCEAN_SPACES_ENDPOINT,
    accessKeyId: process.env.DIGITALOCEAN_SPACES_KEY,
    secretAccessKey: process.env.DIGITALOCEAN_SPACES_SECRET,
    region: process.env.DIGITALOCEAN_SPACES_REGION
});

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/webp'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}


const upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: process.env.DIGITALOCEAN_SPACES_BUCKET,
            acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname + '-' + new Date().toISOString().replace(/:/g, "-") + path.extname(file.originalname)});
        },
            key: function (req, file, cb) {
                cb(null, 'ecom/'+Date.now().toString() + '-' + file.originalname);
            },
        }),

    fileFilter: fileFilter
    });

module.exports = upload;

// aws.config.update({
//     maxRetries: 3,
//     httpOptions: {timeout: 30000, connectTimeout: 5000},
//     region:  process.env.DIGITALOCEAN_SPACES_REGION,
//     accessKeyId: process.env.DIGITALOCEAN_SPACES_KEY,
//     secretAccessKey: process.env.DIGITALOCEAN_SPACES_KEY,
// });

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         let dest = 'src/uploads/' + req.body.type;
//         let stat = null;
//         try {
//             stat = fs.statSync(dest);
//         } catch (err) {
//             fs.mkdirSync(dest);
//         }
//         if (stat && !stat.isDirectory()) {
//             throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
//         }
//         cb(null, dest);
//     },
//
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + new Date().toISOString().replace(/:/g, "-") + path.extname(file.originalname));
//     }
// });
// const storage =  multerS3({
//         s3: s3,
//         bucket: 'assets-softcommerct',
//         acl: 'public-read',
//         metadata: function (req, file, cb) {
//             cb(null, {fieldName: file.fieldname + '-' + new Date().toISOString().replace(/:/g, "-") + path.extname(file.originalname)});
//         },
//         key: function (req, file, cb) {
//             cb(null, Date.now().toString())
//         }
//     })
//
//
// const fileFilter = (req, file, cb) =>{
//     if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
//         cb(null, true);
//     }else{
//         cb(null, false);
//     }
// }
