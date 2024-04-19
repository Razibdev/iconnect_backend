const mongoose = require("mongoose");
const portfolioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide title!!!"],
        unique: true
    },
    slug: String,
    feature_image: {
        type: String,
    },
    image_list: {
        type: Array
    },
    // image_list:[
    //     {
    //         id:{
    //            type: mongoose.Types.ObjectId,
    //         },
    //         image:{
    //             type: String
    //         }
    //     }
    // ],

    pre_text:{
      type: String
    },

    description:{
      type: String
    },

    status: {
        type: Boolean,
        default: true,
    },

});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);
module.exports = Portfolio;