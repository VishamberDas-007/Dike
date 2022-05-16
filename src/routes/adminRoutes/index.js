const express = require("express");
const routes = express.Router();
const verify = require("../../middlewares/verify");

routes.use("/auth", require("./authRoutes")); // all auth routes are indexed here
routes.use("/category", verify.isAdmin, require("./categoryRoutes")); // all category routes are indexed here
routes.use("/product", require("./productRoutes")); // all product routes are indexed here

module.exports = routes;
