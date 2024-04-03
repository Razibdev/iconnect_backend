const express = require("express");
const router = express.Router();
const AWS = require('aws-sdk');
const multer = require('multer');
const archiver = require('archiver');

// Set up AWS SDK with your DigitalOcean Spaces credentials
const spacesEndpoint = new AWS.Endpoint(process.env.DIGITALOCEAN_SPACES_ENDPOINT);
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.DIGITALOCEAN_SPACES_KEY,
    secretAccessKey: process.env.DIGITALOCEAN_SPACES_SECRET,
});

// Set up multer for handling file uploads
const upload = multer();

// Define a route to handle uploading a zip file to DigitalOcean Spaces
router.route("/upload").post(upload.single('zipFile'), async (req, res) => {
    const bucketName = process.env.DIGITALOCEAN_SPACES_BUCKET;

    try {
        // Get the uploaded zip file from the request
        const zipFile = req.file.buffer;

        // Create a unique key for the zip file in the bucket
        const key = `uploads/${Date.now()}_files.zip`;

        // Upload the zip file to DigitalOcean Spaces
        await s3.upload({
            Bucket: bucketName,
            Key: key,
            Body: zipFile,
            ContentType: 'application/zip'
        }).promise();

        // Respond with a success status and the URL of the uploaded zip file
        return res.status(200).json({
            status: 'success',
            message: 'File uploaded successfully',
            fileUrl: `https://${process.env.DIGITALOCEAN_SPACES_BUCKET}.${process.env.DIGITALOCEAN_SPACES_ENDPOINT}/${key}`
        });
    } catch (error) {
        console.error(error);
        // Respond with an error status if something goes wrong
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
});

module.exports = router;
