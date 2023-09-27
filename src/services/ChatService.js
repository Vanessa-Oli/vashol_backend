const ChatRepository = require("../repositories/ChatRepository");

class ChatService {
    constructor(chatRepository) {
        this.chatRepository = chatRepository;
    }

    async listChatMessages(chatId) {
        const messages = await this.chatRepository.listMessages(chatId);
        return messages;
    }

    async sendMessage(chatId, sender, message) {
        const sentMessage = await this.chatRepository.sendMessage(chatId, sender, message);
        return sentMessage;
    }

    async getMessageById(messageId) {
        const message = await this.chatRepository.getMessageById(messageId);
        return message;
    }

    async editMessage(messageId, newMessage) {
        const editedMessage = await this.chatRepository.editMessage(messageId, newMessage);
        return editedMessage;
    }

    async deleteMessage(messageId) {
        const deletedMessage = await this.chatRepository.deleteMessage(messageId);
        return deletedMessage;
    }
}

module.exports = new ChatService(ChatRepository);
