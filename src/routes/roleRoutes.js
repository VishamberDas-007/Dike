const express = require("express");
const routes = express.Router();
const { roleCtrl } = require("../controllers/index").static;

routes.post("/insert", async (req, res) => {
	let result = await roleCtrl.insert(req);
	console.log({ result: result });
	return res.status(result.status).json(result);
});

module.exports = routes;
