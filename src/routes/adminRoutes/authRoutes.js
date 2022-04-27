const express = require("express");
const routes = express.Router();
const { auth } = require("../../controllers/index").commonCtrl;

routes.post("/login", async (req, res) => {
	let result = await auth.signIn(req, 1);
	console.log({ result: result });
	return res.status(result.status).json(result);
});

module.exports = routes;
