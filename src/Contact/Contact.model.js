const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: [true, "Please tell us name!!!"]
    },
    email: {
        type: String
    },
    phone:{
        type: String
    },

    message:{
        type: String
    },

    status: {
        type: Boolean,
        default: true,
    },

}, {
    timestamps: true
});


const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;