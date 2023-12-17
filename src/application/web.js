const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");
const path = require('path');

const { publicRouter } = require("../route/public-api");
const { errorMiddleware } = require("../middleware/error-middleware");

const swaggerUI = require("swagger-ui-express");
const yamlJS = require("yamljs");
const swaggerSpec = yamlJS.load(path.resolve(__dirname, '../../docs/swagger.yaml'));


const web = express();

web.use(express.json());
web.use(cookies());

web.use(cors({ origin: true, credentials: true }));

web.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, {explorer: true}));

web.use(publicRouter);
web.use(errorMiddleware);

module.exports = web;
