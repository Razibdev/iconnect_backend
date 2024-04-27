const mongoose = require("mongoose");
const clientSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: [true, "Please tell us project name!!!"]
    },
    email: {
        type: String
    },

    phone: {
        type: String
    },
    subject:{
        type: String
    },

    description:{
        type: String
    },

    status: {
        type: Boolean,
        default: true,
    },

}, {
    timestamps: true
});


const Client = mongoose.model("Client", clientSchema);
module.exports = Client;