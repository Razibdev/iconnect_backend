const mongoose = require("mongoose");
// require('mongoose-double')(mongoose);
// let SchemaTypes = mongoose.Schema.Types;
const projectSchema = new mongoose.Schema({
    project_name: {
        type: String,
        required: [true, "Please provide project name!!!"],
        unique: true
    },
    description: {
        type: String
    },
    price:{
      type: Number
    },
    image: {
        type: String,
    },
    group_image: {
        type: Array
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
    // category_id:{
    //     type: SchemaTypes.ObjectId,
    //     ref: 'Category'
    // },
});
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;