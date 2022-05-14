const response = require("../../responses/response");
const db = require("../../models/index");
const sequelize = require("sequelize");

// to insert new category
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
		if (categoryExist) return response.alreadyExists("Category already exists");

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

// to delete existing category
exports.delete = async (req) => {
	try {
		const catID = req.params.id;
		console.log({ catID: catID });
		const whereClause = { id: catID };
		// check if the category ID does not exists
		const categoryExist = await db.category.findOne({
			where: whereClause,
		});
		if (!categoryExist) return response.notFound("Category not found");
		// deleting the existing category
		await db.category.destroy({
			where: whereClause,
		});
		return response.successResponse(
			"Category deleted successfully",
			categoryExist
		);
	} catch (error) {
		return response.errorResponse(
			"Error occurred while deleting category",
			error
		);
	}
};

// to edit category
exports.edit = async (req) => {
	try {
		const catID = req.params.id;
		console.log({ catID: catID });
		const whereClause = { id: catID };
		// check if the category exists
		const categoryExist = await db.category.findOne({
			where: whereClause,
		});
		// if category does not exist
		if (!categoryExist) return response.notFound("Category not found");

		return response.successResponse(
			"Catefory editted successfully",
			categoryExist
		);
	} catch (error) {
		return response.errorResponse(
			"Error occurred while editing category",
			error
		);
	}
};

// to update category
exports.update = async (req) => {
	try {
		const catID = req.params.id;
		const catName = req.body.name;
		const whereClause = { id: catID };
		// check if the category exists
		const categoryExist = await db.category.findOne({
			where: whereClause,
		});
		// if category does not exist
		if (!categoryExist) return response.notFound("Category not found");
		// if the category name is already present in database
		const categoryNameExist = await db.category.findOne({
			where: {
				id: {
					[sequelize.Op.not]: catID,
				},
				name: catName,
			},
		});
		if (categoryNameExist)
			return response.alreadyExists("Category Name already exists");
		await categoryExist.update({
			name: catName,
		});
		return response.successResponse(
			"Category updated successully",
			categoryExist
		);
	} catch (error) {
		return response.errorResponse(
			"Error occurred while updating category",
			error
		);
	}
};
