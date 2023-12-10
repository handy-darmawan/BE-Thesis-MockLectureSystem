const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");

const { publicRouter } = require("../route/public-api");
const { errorMiddleware } = require("../middleware/error-middleware");

const web = express();

web.use(express.json());
web.use(cookies());

web.use(cors({ origin: true, credentials: true }));

web.use(publicRouter);
web.use(errorMiddleware);

module.exports = web;
