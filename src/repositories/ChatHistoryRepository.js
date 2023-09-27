const { ObjectId } = require("mongodb");

class ChatHistoryRepository {
    constructor() {
        this.collection = client.db("vashol").collection("chat_history");
    }
    async create({ userId, eventId, sender, message }) {
        try {
            const result = await this.collection.insertOne({
                userId,
                eventId,
                sender,
                message,
                timestamp: new Date(),
            });
            return result.insertedId;
        } catch (error) {
            console.error("Erro ao criar registro de histórico de chat:", error);
            throw error;
        }
    }

    async findByUserId(userId) {
        try {
            const chatHistory = await this.collection
                .find({ userId: userId })
                .toArray();
            return chatHistory;
        } catch (error) {
            console.error("Erro ao buscar histórico de chat por ID de usuário:", error);
            throw error;
        }
    }
}

module.exports = new ChatHistoryRepository();
