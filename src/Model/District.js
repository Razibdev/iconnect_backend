const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const districtSchema = new Schema(
    {
        gid: {
            type:String,
        },

        division_id: {
            type: String
        },

        name: {
            type: String,
        },
        bn_name: {
            type: String,
            default: ''
        },
        lat: {
            type: String,
            default: ''
        },
        lon: {
            type: String,
            default: ''
        },
        url: {
                type: String,
                default: ''
        },
    },
    {
        timestamps: true,
    }
);


const District = mongoose.model("District", districtSchema);
module.exports = District;