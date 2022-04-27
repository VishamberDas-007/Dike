const express = require("express");
const expressApp = express();
const config = require("./config/default.json"); // importing config.json file
const bodyParser = require("body-parser");
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));
const db = require("./src/models");

// routes
expressApp.use("/api", require("./src/routes/index"));

// Listening app at defined port in config file
expressApp.listen(config.mysql.port, () =>
	console.log(
		`DIKE NodeJS, Sequelize, and Express API running on port ${config.mysql.port}`
	)
);

// db.sequelize.sync().then(() => {
// 	console.log("Model called successfully");
// });
