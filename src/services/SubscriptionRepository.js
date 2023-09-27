const SubscriptionRepository = require("../repositories/SubscriptionRepository");

class SubscriptionService {
    async listSubscriptions() {
        return await SubscriptionRepository.findAll();
    }

    async getSubscription(id) {
        return await SubscriptionRepository.findById(id);
    }

    async createSubscription({ userId, eventId }) {
        return await SubscriptionRepository.create({ userId, eventId });
    }

    async updateSubscription(id, { userId, eventId }) {
        return await SubscriptionRepository.update(id, { userId, eventId });
    }

    async deleteSubscription(id) {
        return await SubscriptionRepository.delete(id);
    }
}

module.exports = new SubscriptionService();
