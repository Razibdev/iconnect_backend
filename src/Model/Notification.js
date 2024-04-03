const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const notificationSchema = new Schema(
    {
        sender_id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        receiver_id:{
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        seen: { type: Boolean, default: false },

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


const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;