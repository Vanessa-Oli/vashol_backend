const EventRepository = require("../repositories/EventRepository");

class EventService {
    async listEvents() {
        return await EventRepository.findAll();
    }

    async getEvent(id) {
        return await EventRepository.findById(id);
    }

    async createEvent({ title, description, startDatetime, endDatetime }) {
        return await EventRepository.create({ title, description, startDatetime, endDatetime });
    }

    async updateEvent(id, { title, description, startDatetime, endDatetime }) {
        return await EventRepository.update(id, { title, description, startDatetime, endDatetime });
    }

    async deleteEvent(id) {
        return await EventRepository.delete(id);
    }
}

module.exports = new EventService();
