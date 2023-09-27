const { Router } = require("express");
const EventController = require("../controllers/EventController");

const eventRoutes = Router();
const eventController = new EventController();

eventRoutes.get("/", eventController.index);
eventRoutes.get("/:id", eventController.show);
eventRoutes.post("/", eventController.create);
eventRoutes.put("/:id", eventController.update);
eventRoutes.delete("/:id", eventController.delete);

module.exports = eventRoutes;
