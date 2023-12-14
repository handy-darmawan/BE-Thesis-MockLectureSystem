const express = require("express");
const userController = require("../controller/user-controller");
const transactionController = require("../controller/transaction-controller");
const { authMiddleware } = require("../middleware/auth-middleware");
const publicRouter = new express.Router();

/* User API */
publicRouter.post("/api/user/login", userController.login);
publicRouter.get("/api/user/token", userController.getToken);
// publicRouter.use(authMiddleware);
publicRouter.delete("/api/user/logout", userController.logout);

/* Transactions API */
publicRouter.get("/api/transactions/shifts", transactionController.getShifts)
publicRouter.get("/api/transactions", transactionController.getTransactions)
publicRouter.post("/api/transactions/export/csv", transactionController.exportCSV)
publicRouter.post("/api/transactions/export/excel", transactionController.exportExcel)
publicRouter.post("/api/transactions/search", transactionController.searchTransaction)
publicRouter.patch("/api/transactions/:transactionID", transactionController.updateLectureStatus)

module.exports = {
  publicRouter,
};
