const EventService = require("../services/EventService");

class EventController {
    async index(request, response) {
        try {
            const events = await EventService.listEvents();
            return response.status(200).json(events);
        } catch (error) {
            return response.status(500).json({ error: "Failed to fetch events" });
        }
    }

    async show(request, response) {
        const { id } = request.params;
        try {
            const event = await EventService.getEvent(id);
            if (!event) {
                return response.status(404).json({ error: "Event not found" });
            }
            return response.status(200).json(event);
        } catch (error) {
            return response.status(500).json({ error: "Failed to fetch event" });
        }
    }

    async create(request, response) {
        const { title, description, startDatetime, endDatetime } = request.body;
        try {
            const event = await EventService.createEvent({ title, description, startDatetime, endDatetime });
            return response.status(201).json(event);
        } catch (error) {
            return response.status(500).json({ error: "Failed to create event" });
        }
    }

    async update(request, response) {
        const { id } = request.params;
        const { title, description, startDatetime, endDatetime } = request.body;
        try {
            const event = await EventService.updateEvent(id, { title, description, startDatetime, endDatetime });
            if (!event) {
                return response.status(404).json({ error: "Event not found" });
            }
            return response.status(200).json(event);
        } catch (error) {
            return response.status(500).json({ error: "Failed to update event" });
        }
    }

    async delete(request, response) {
        const { id } = request.params;
        try {
            const event = await EventService.getEvent(id);
            if (!event) {
                return response.status(404).json({ error: "Event not found" });
            }
            await EventService.deleteEvent(id);
            return response.status(200).json({ message: "Event deleted successfully" });
        } catch (error) {
            return response.status(500).json({ error: "Failed to delete event" });
        }
    }
}

module.exports = EventController;
