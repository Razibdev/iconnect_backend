const express = require("express");
const router = express.Router();
const AWS = require('aws-sdk');
const archiver = require('archiver');

// Set up AWS SDK with your DigitalOcean Spaces credentials
const spacesEndpoint = new AWS.Endpoint(process.env.DIGITALOCEAN_SPACES_ENDPOINT);
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.DIGITALOCEAN_SPACES_KEY,
    secretAccessKey: process.env.DIGITALOCEAN_SPACES_SECRET,
});

// Define a route to handle downloading all files as a zip
router.route("/download/all").get(async (req, res) => {
    const bucketName = process.env.DIGITALOCEAN_SPACES_BUCKET;
    const archive = archiver('zip');

    // Set the content type header to indicate a zip file
    res.setHeader('Content-Type', 'application/zip');

    // Set the content disposition header to trigger a download
    res.setHeader('Content-Disposition', 'attachment; filename=files.zip');

    archive.pipe(res);

    try {
        // List all objects in the bucket
        const objects = await s3.listObjects({ Bucket: bucketName }).promise();

        // Add each object to the zip file
        for (const object of objects.Contents) {
            const params = { Bucket: bucketName, Key: object.Key };
            const data = await s3.getObject(params).promise();
            archive.append(data.Body, { name: object.Key });
        }

        // Finalize the zip file and send it to the client
        archive.finalize();
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