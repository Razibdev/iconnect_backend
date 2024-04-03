const mongoose = require("mongoose");
require('mongoose-double')(mongoose);
let SchemaTypes = mongoose.Schema.Types;
const subCategorySchema = new mongoose.Schema({
    sub_cat_name: {
        type: String,
        required: [true, "Please provide sub category name!!!"],
        unique: true
    },
    sub_cat_description: {
        type: String
    },
    image_url: {
        type: String,
    },
    sub_cat_slug:{
        type: String,
        lower: true
    },

    status: {
        type: Boolean,
        default: true,
        select: false,
    },
    category_id:{
        type: SchemaTypes.ObjectId,
        ref: 'Category'
    },
});
const SubCategory = mongoose.model("SubCategory", subCategorySchema);
module.exports = SubCategory;