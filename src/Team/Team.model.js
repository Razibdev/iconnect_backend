const mongoose = require("mongoose");
// require('mongoose-double')(mongoose);
// let SchemaTypes = mongoose.Schema.Types;
const teamSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please provide name!!!"],
        unique: true
    },

    email:{
        type: String
    },

    phone:{
        type: String
    },

    designation:{
      type: String,
    },

    description: {
        type: String
    },

    image: {
        type: String,
    },

    status: {
        type: Boolean,
        default: true,
        select: false,
    },
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;