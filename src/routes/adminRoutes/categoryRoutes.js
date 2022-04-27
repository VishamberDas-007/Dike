const express = require("express");
const routes = express.Router();
const { category } = require("../../controllers/index").adminCtrl;

routes.post("/insert", async (req, res) => {
	let result = await category.insert(req);
	console.log({ result: result });
	return res.status(result.status).json(result);
});

module.exports = routes;
