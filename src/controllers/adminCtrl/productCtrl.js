const response = require("../../responses/response");
const db = require("../../models/index");
const productModel = db.product;

// to insert product
exports.insert = async (req, fileName, fileExtension) => {
	try {
		const productDetails = {
			catID: req.body.catID,
			name: req.body.name,
			imageName: fileName,
			description: req.body.description,
			status: req.body.status,
		};
		if (
			fileExtension != ".jpg" ||
			fileExtension != ".jpeg" ||
			fileExtension != ".gif" ||
			fileExtension != ".png"
		)
			return response.notFound("Upload Image only");
		console.log(productDetails);
		// check if the product already exists
		const productExists = await productModel.findOne({
			where: {
				name: productDetails.name,
			},
		});
		// if product exits then return
		if (productExists) return response.alreadyExists("Product already exists");

		const newProduct = await productModel.create(productDetails);
		return response.successResponse(
			"New Product entered successfully",
			newProduct
		);
	} catch (error) {
		response.errorResponse("Error occurred while inserting product", error);
	}
};
