const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const transactionSchema = new Schema(
    {
        sender_id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        receiver_id:{
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        type:{
            type: String
        },
        amount:{
            type: Number
        },

        message: {
            type: String,
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


const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;