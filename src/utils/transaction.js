const mongoose = require("mongoose");
const Transaction = require("../User/Transaction.model")
const User = require("../models/User");

async function balanceTransfer(amount, senderId) {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // Input validation
        if (typeof amount !== 'number' || amount <= 0 || !senderId) {
            throw new Error("Invalid input parameters");
        }

        const senderWallet = await User.findById(senderId);
        const receiverWallet = await User.findById('6511d10774604ec40706db9b');

        if (!senderWallet || !receiverWallet) {
            throw new Error("Sender or Receiver not found");
        }

        if (senderWallet.balance < amount) {
            throw new Error("Insufficient balance");
        }

        // Update sender's wallet balance (deduct amount)
        senderWallet.balance -= amount;
        await senderWallet.save({ session });

        // Update receiver's wallet balance (add amount)
        receiverWallet.balance += amount;
        await receiverWallet.save({ session });

        // Create transaction records
        const senderTransaction = new Transaction({
            users: senderId,
            type: 'out',
            out_wallet: senderWallet._id,
            in_wallet: receiverWallet._id,
            amount,
        });

        const receiverTransaction = new Transaction({
            users: receiverWallet._id,
            type: 'in',
            out_wallet: senderWallet._id,
            in_wallet: receiverWallet._id,
            amount,
        });

        await senderTransaction.save({ session });
        await receiverTransaction.save({ session });

        await session.commitTransaction();
        await session.endSession();

        return {
            code: 200,
            status: 200,
            message: 'Payment Successfully done'
        };

    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        return {
            code: 500,
            status: 500,
            message: err.message || "Transaction Failed"
        };
    }
}

module.exports = {
    balanceTransfer,
};