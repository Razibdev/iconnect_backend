const fs = require("fs");
const path = require("path");

// Define the path to the upload folder
const rootDirectory = process.cwd();
const uploadFolder = path.join(rootDirectory, 'src', 'public');

function deleteImage(filename, callback) {
    const imagePath = path.join(uploadFolder, filename);
    console.log(imagePath)
    // Check if the file exists
    if (fs.existsSync(imagePath)) {
        // Delete the file
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(err);
                callback(err);
            } else {
                callback(null, 'Image deleted successfully.');
            }
        });
    } else {
        callback(new Error('Image not found.'));
    }
}

module.exports = { deleteImage };
