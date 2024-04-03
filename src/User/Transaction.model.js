const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const transactionSchema = new Schema({
        users:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },

        type:{
            type: String,
            enum:["in", "out"],
            default: "in"
        },

        in_wallet:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },

        out_wallet:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },

        amount:{
            type: Number,
            default: 0
        },

        edit_date: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    });


const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;