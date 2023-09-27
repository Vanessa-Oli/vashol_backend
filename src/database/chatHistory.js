const mongoose = require("mongoose");

const chatHistorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    eventId: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const ChatHistory = mongoose.model("ChatHistory", chatHistorySchema);

module.exports = ChatHistory;
