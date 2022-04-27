const express = require("express");
const routes = express.Router();

routes.use("/auth", require("./authRoutes"));

module.exports = routes;
