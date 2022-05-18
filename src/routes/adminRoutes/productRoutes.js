const express = require("express");
const routes = express.Router();
const { product } = require("../../controllers/index").adminCtrl;
const multer = require("multer");
const path = require("path");
const fileLocation = path.join(__dirname, "../../uploads");

var fileName, timeStamp, fileExtension, tempFileName;
var array = [],
	j = 0;

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		fileExtension = path.extname(file.originalname);

		// validating the extension
		if (
			fileExtension == ".jpg" ||
			fileExtension == ".png" ||
			fileExtension == ".jpeg" ||
			fileExtension == ".gif"
		)
			cb(null, fileLocation);
		else cb("Upload Image only");
	},

	filename: function (req, file, cb) {
		timeStamp = Date.now();
		fileExtension = path.extname(file.originalname);
		fileName = timeStamp.toString() + fileExtension;
		tempFileName = fileName;
		array[j] = fileName;
		j++;
		cb(null, fileName);
	},
});
var upload = multer({ storage: storage });

// product insert route for multiple image upload max count 5

routes.post("/insert", upload.array("file", 5), async (req, res) => {
	let result = await product.insert(req, array);
	console.log({ result: result });
	j = 0;
	array = [];
	return res.status(result.status).json(result);
});

module.exports = routes;
