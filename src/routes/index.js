const { Router } = require("express");
const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const chatRouter = require("./chat.routes");
const eventRouter = require("./event.routes");
const subscriptionRouter = require("./subscription.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/chat", chatRouter);
routes.use("/event", eventRouter);
routes.use("/subscription", subscriptionRouter);

module.exports = routes;
