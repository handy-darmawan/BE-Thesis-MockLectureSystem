const express = require("express");
const userController = require("../controller/user-controller");
const { authMiddleware } = require("../middleware/auth-middleware");
const publicRouter = new express.Router();

publicRouter.post("/api/user/login", userController.login);
publicRouter.get("/api/user/token", userController.getToken);

publicRouter.use(authMiddleware);
publicRouter.delete("/api/user/logout", userController.logout);

module.exports = {
  publicRouter,
};
