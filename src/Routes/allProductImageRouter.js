const express = require("express");
const router = express.Router();
const Product = require('../Product/Product.model')

// Define a route to handle downloading all files as a zip
router.route("/").get(async (req, res) => {
    try {
       const data = await Product.find();
       data.forEach(async(item) =>{
           const expolde = item.feature_image.split('/');
           let fetch_img = expolde[0]+'//'+'asset.efashionbd.com/'+expolde[3]+'/'+expolde[4];
           let imagep = [];
           item.image_gallery.forEach(image=>{
               let imageexp = image.split('/');
               imagep.push(imageexp[0]+'//'+'asset.efashionbd.com/'+imageexp[3]+'/'+imageexp[4]);
           })
           item.feature_image = fetch_img
           item.image_gallery = imagep;
          await item.save();
       });

        return res.status(200).json({
            status: 'success',
            message: 'success work',
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