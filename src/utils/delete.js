const dotenv = require("dotenv");
dotenv.config({
    path: "./src/config.env",
});

const aws = require('aws-sdk');
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const s3 = new aws.S3({
    endpoint: process.env.DIGITALOCEAN_SPACES_ENDPOINT,
    accessKeyId: process.env.DIGITALOCEAN_SPACES_KEY,
    secretAccessKey: process.env.DIGITALOCEAN_SPACES_SECRET,
    region: process.env.DIGITALOCEAN_SPACES_REGION
});


const DeleteObject = (url) => {
    let currentData;
    let params = {
        Bucket: process.env.DIGITALOCEAN_SPACES_BUCKET,
        Prefix: 'ecom/'
    };

    const fileSplit = url.split("/");
    let filename = fileSplit[3] + '/' + fileSplit[4];

    return s3.listObjects(params).promise().then(data => {
        if (data.Contents.length === 0) {
            throw new Error('List of objects empty.');
        }
        // console.log(data.Contents)

        currentData = data;

        params = {Bucket: process.env.DIGITALOCEAN_SPACES_BUCKET};
        params.Delete = {Objects: []};

        currentData.Contents.forEach(content => {
            console.log(content.Key)
            if (filename == content.Key) {
                params.Delete.Objects.push({Key: content.Key});
            }
        });
        return s3.deleteObjects(params).promise();
    }).then(() => {

        if (currentData.Contents.length === 1000) {
            emptyBucket(bucketName, callback);
        } else {
            return true;
        }
    });
}

module.exports = DeleteObject;