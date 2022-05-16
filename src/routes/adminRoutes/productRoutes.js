const express = require("express");
const routes = express.Router();
const { product } = require("../../controllers/index").adminCtrl;
const multer = require("multer");
const path = require("path");
const fileLocation = path.join(__dirname, "../../uploads");
// const services = require("../../services/services");
// const upload = services.upload;

var fileName, timeStamp, fileExtension, tempFileName;

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, fileLocation);
	},
	filename: function (req, file, cb) {
		timeStamp = Date.now();
		fileExtension = path.extname(file.originalname);
		fileName = timeStamp.toString() + fileExtension;
		tempFileName = fileName;
		cb(null, fileName);
	},
});
var upload = multer({ storage: storage });

// product insert route
routes.post("/insert", upload.single("file"), async (req, res) => {
	console.log({ fileExtension: fileExtension });
	let result = await product.insert(req, fileName, fileExtension);
	return res.status(result.status).json(result);
});

module.exports = routes;
