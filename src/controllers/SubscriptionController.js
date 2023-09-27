const SubscriptionService = require("../services/SubscriptionService");

class SubscriptionController {
    async index(request, response) {
        try {
            const subscriptions = await SubscriptionService.listSubscriptions();
            return response.status(200).json(subscriptions);
        } catch (error) {
            return response.status(500).json({ error: "Failed to fetch subscriptions" });
        }
    }

    async show(request, response) {
        const { id } = request.params;
        try {
            const subscription = await SubscriptionService.getSubscription(id);
            if (!subscription) {
                return response.status(404).json({ error: "Subscription not found" });
            }
            return response.status(200).json(subscription);
        } catch (error) {
            return response.status(500).json({ error: "Failed to fetch subscription" });
        }
    }

    async create(request, response) {
        const { userId, eventId } = request.body;
        try {
            const subscription = await SubscriptionService.createSubscription({ userId, eventId });
            return response.status(201).json(subscription);
        } catch (error) {
            return response.status(500).json({ error: "Failed to create subscription" });
        }
    }

    async update(request, response) {
        const { id } = request.params;
        const { userId, eventId } = request.body;
        try {
            const subscription = await SubscriptionService.updateSubscription(id, { userId, eventId });
            if (!subscription) {
                return response.status(404).json({ error: "Subscription not found" });
            }
            return response.status(200).json(subscription);
        } catch (error) {
            return response.status(500).json({ error: "Failed to update subscription" });
        }
    }

    async delete(request, response) {
        const { id } = request.params;
        try {
            const deletedSubscription = await SubscriptionService.deleteSubscription(id);
            if (!deletedSubscription) {
                return response.status(404).json({ error: "Subscription not found" });
            }
            return response.status(200).json({ message: "Subscription deleted successfully" });
        } catch (error) {
            return response.status(500).json({ error: "Failed to delete subscription" });
        }
    }
}

module.exports = SubscriptionController;
