const express = require("express");
const routes = express.Router();
const { category } = require("../../controllers/index").adminCtrl;

// category insert route
routes.post("/insert", async (req, res) => {
	let result = await category.insert(req);
	return res.status(result.status).json(result);
});

// category delete route
routes.delete("/delete/:id", async (req, res) => {
	let result = await category.delete(req);
	console.log({ result: result });
	return res.status(result.status).json(result);
});

// category edit route
routes.get("/edit/:id", async (req, res) => {
	let result = await category.edit(req);
	console.log({ result: result });
	return res.status(result.status).json(result);
});

// category update route
routes.get("/update/:id", async (req, res) => {
	let result = await category.update(req);
	console.log({ result: result });
	return res.status(result.status).json(result);
});

module.exports = routes;
