const Notification = require("../Model/Notification")
async function notification(receiverId, message,url='', senderId='') {
    try {

        const notification = new Notification({
            receiver_id: receiverId,
            message,
            url,
        });

        notification.save();
        return {
            code: 200,
            status: 200,
            message: 'Notification Successfully done'
        };

    } catch (err) {

        return {
            code: 500,
            status: 500,
            message: err.message || "Notification Failed"
        };
    }
}

module.exports = {
    notification,
};