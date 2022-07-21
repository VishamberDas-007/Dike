const response = require("../../responses/response");
const db = require("../../models/index");
const productModel = db.product;

// to insert product
exports.insert = async (req, fileName) => {
	try {
		// converting the array into object
		const obj = Object.assign({}, fileName);

		const productDetails = {
			catID: req.body.catID,
			name: req.body.name,
			// stringifying the array to store in database
			imageName: JSON.stringify(obj),
			description: req.body.description,
			status: req.body.status,
		};

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

// to edit product
exports.edit = async (req) => {
	try {
		const id = req.params.id;
		// check if the product already exists
		const productExists = await productModel.findOne({
			where: {
				id: id,
			},
		});
		// if product exits then return
		if (productExists) {
			return response.successResponse("Product found", productExists);
		} else return response.notFound("Product not found");
	} catch (error) {
		response.errorResponse("Error occurred while editing product", error);
	}
};

// to update product
exports.update = async (req) => {
	try {
		const id = req.params.id;
		const whereClause = {
			id: id,
		};
		const user = {
			name: req.body.name,
			description: req.body.description,
			// imageName:req.body.imageName,
		};
		// check if the product already exists
		const productExists = await productModel.findOne({
			where: whereClause,
		});

		if (productExists) {
			await productExists.update({ user });
		} else return response.notFound("Product not found");

		return response.successResponse(
			"Product updated successfully",
			productExists
		);
	} catch (error) {
		response.errorResponse("Error occurred while updating product", error);
	}
};
