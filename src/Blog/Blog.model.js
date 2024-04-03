const mongoose = require("mongoose");
// require('mongoose-double')(mongoose);
// let SchemaTypes = mongoose.Schema.Types;
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide blog title!!!"],
        unique: true
    },
    description: {
        type: String
    },

    image: {
        type: String,
    },

    slug:{
        type: String,
        lower: true
    },

    status: {
        type: Boolean,
        default: true,
        select: false,
    },

});
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;