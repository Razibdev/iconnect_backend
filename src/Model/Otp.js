const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const otpSchema = new Schema(
    {
        mobile: {
            type:String,
        },

        code: {
            type: String
        },

        count_number: {
            type: Number,
            default: 1
        },

    },
    {
        timestamps: true,
    }
);


const Otp = mongoose.model("Otp", otpSchema);
module.exports = Otp;