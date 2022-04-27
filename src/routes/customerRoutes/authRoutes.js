const express = require("express");
const routes = express.Router();
const { auth } = require("../../controllers/index").commonCtrl;

routes.post("/register", async (req, res) => {
	let result = await auth.signUp(req, 2);
	console.log(result);
	return res.status(result.status).json(result);
});

routes.post("/login", async (req, res) => {
	let result = await auth.signIn(req, 2);
	console.log({ result: result });
	return res.status(result.status).json(result);
});

module.exports = routes;
