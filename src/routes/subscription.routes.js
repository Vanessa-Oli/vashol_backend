const { Router } = require("express");
const SubscriptionController = require("../controllers/SubscriptionController");

const subscriptionRoutes = Router();
const subscriptionController = new SubscriptionController();

subscriptionRoutes.get("/", subscriptionController.index);
subscriptionRoutes.get("/:id", subscriptionController.show);
subscriptionRoutes.post("/", subscriptionController.create);
subscriptionRoutes.put("/:id", subscriptionController.update);
subscriptionRoutes.delete("/:id", subscriptionController.delete);

module.exports = subscriptionRoutes;
