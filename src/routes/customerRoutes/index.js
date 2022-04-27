const express = require("express");
const routes = express.Router();

// auth routes
routes.use("/auth", require("./authRoutes"));

module.exports = routes;
