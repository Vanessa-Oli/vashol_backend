const knex = require("../database");
const SUBSCRIPTION_TABLE = "subscriptions";

class SubscriptionRepository {
    async create({ userId, eventId }) {
        const subscription = await knex(SUBSCRIPTION_TABLE).insert({
            userId,
            eventId,
        });
        return subscription;
    }

    async findSubscriptionsByUserId(userId) {
        const subscriptions = await knex(SUBSCRIPTION_TABLE)
            .where({ userId })
            .select("*");
        return subscriptions;
    }
}

module.exports = new SubscriptionRepository();
