const ChatHistoryService = require("../services/ChatHistoryService");
class ChatHistoryController {
    async index(request, response) {
        try {
            const chatHistory = await ChatHistory.find();
            return response.status(200).json(chatHistory);
        } catch (error) {
            return response.status(500).json({ error: "Failed to fetch chat history" });
        }
    }

    async show(request, response) {
        const { id } = request.params;
        try {
            const chatEntry = await ChatHistory.findById(id);
            if (!chatEntry) {
                return response.status(404).json({ error: "Chat history entry not found" });
            }
            return response.status(200).json(chatEntry);
        } catch (error) {
            return response.status(500).json({ error: "Failed to fetch chat history entry" });
        }
    }

    async create(request, response) {
        const { userId, eventId, sender, message } = request.body;
        try {
            const chatEntry = await ChatHistory.create({ userId, eventId, sender, message });
            return response.status(201).json(chatEntry);
        } catch (error) {
            return response.status(500).json({ error: "Failed to create chat history entry" });
        }
    }

    async update(request, response) {
        const { id } = request.params;
        const { userId, eventId, sender, message } = request.body;
        try {
            const chatEntry = await ChatHistory.findByIdAndUpdate(id, { userId, eventId, sender, message });
            if (!chatEntry) {
                return response.status(404).json({ error: "Chat history entry not found" });
            }
            return response.status(200).json(chatEntry);
        } catch (error) {
            return response.status(500).json({ error: "Failed to update chat history entry" });
        }
    }

    async delete(request, response) {
        const { id } = request.params;
        try {
            const chatEntry = await ChatHistory.findByIdAndRemove(id);
            if (!chatEntry) {
                return response.status(404).json({ error: "Chat history entry not found" });
            }
            return response.status(200).json({ message: "Chat history entry deleted successfully" });
        } catch (error) {
            return response.status(500).json({ error: "Failed to delete chat history entry" });
        }
    }
}

module.exports = ChatHistoryController;
