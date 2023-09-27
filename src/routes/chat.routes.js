const { Router } = require("express");
const ChatController = require("../controllers/ChatController");

const chatRoutes = Router();
const chatController = new ChatController();

chatRoutes.get("/", chatController.index);
chatRoutes.get("/:id", chatController.show);
chatRoutes.post("/", chatController.create);
chatRoutes.put("/:id", chatController.update);
chatRoutes.delete("/:id", chatController.delete);

module.exports = chatRoutes;
