const knex = require("../database");
const EVENT_TABLE = "events";

class EventRepository {
    async create({
                     title,
                     description,
                     startDatetime,
                     endDatetime,
                     image,
                     miniatureImage,
                     ownedBy,
                 }) {
        const event = await knex(EVENT_TABLE).insert({
            title,
            description,
            startDatetime,
            endDatetime,
            image,
            miniatureImage,
            ownedBy,
        });
        return event;
    }

    async findEventsByUserId(userId) {
        const events = await knex(EVENT_TABLE)
            .where({ ownedBy: userId })
            .select("*");
        return events;
    }
}

module.exports = new EventRepository();
