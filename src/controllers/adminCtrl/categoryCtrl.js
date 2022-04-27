const response = require("../../responses/response");
const db = require("../../models/index");

exports.insert = async (req) => {
	try {
		const category = {
			name: req.body.name,
		};

		const whereClause = { name: category.name };

		// check if the category name is undefined or not
		if (category.name == undefined)
			return response.notFound("Enter the category name");
		const categoryExist = await db.category.findOne({
			where: whereClause,
		});

		// category already exists
		if (categoryExist) return response.alreadyExists("Categiry already exists");

		// new category to be built
		const newCategory = await db.category.create({ name: category.name });
		return response.successResponse(
			"New category entered successfully",
			newCategory
		);
	} catch (error) {
		return response.errorResponse(
			"Error occurred while inserting category",
			error
		);
	}
};
