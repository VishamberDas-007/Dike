const express = require("express");
const routes = express.Router();

routes.use("/role", require("./roleRoutes"));

routes.use("/admin", require("./adminRoutes/index"));
routes.use("/customer", require("./customerRoutes/index"));

module.exports = routes;
