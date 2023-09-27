const config = require("../../knexfile");
const knex = require("knex");
const mongoose = require("mongoose");
const ChatHistory = require("./chatHistory");

const postgresConnection = knex(config.development);

module.exports = {
    postgresConnection,
    mongoose,
};
mongoose.connect("\"mongodb://vanny:020408@mongo:27017/vashol", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const createChatHistoryCollection = async () => {
    await mongoose.connection.db.createCollection("chat_histories");
    mongoose.connection.close();
};

createChatHistoryCollection();