const express = require("express");
const routes = express.Router();
const verify = require("../../middlewares/verify");

routes.use("/auth", require("./authRoutes"));
routes.use("/category", verify.isAdmin, require("./categoryRoutes"));

module.exports = routes;
