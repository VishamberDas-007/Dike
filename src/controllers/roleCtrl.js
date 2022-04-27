const db = require("../models");
const roleModel = db.role;
const response = require("../responses/response");

async function insert(req, res) {
	try {
		var newRole;
		const name = req.body.name;
		console.log(name);
		const whereClause = { name: name };
		const roleExists = await roleModel.findOne({
			where: whereClause,
		});
		console.log(roleExists);
		if (roleExists) return response.alreadyExists("Role already exists");
		if (name) {
			newRole = await roleModel.create({
				name: name,
			});
		} else {
			console.log(response.notFound("Name is not entered"));
			return response.notFound("Name is not entered");
		}
		console.log(
			response.successResponse("New role is added successfully", newRole)
		);
		return response.successResponse("New role is added successfully", newRole);
	} catch (error) {
		console.log(
			response.errorResponse("Error occurred while adding role", error)
		);
		return response.errorResponse("Error occurred while adding role", error);
	}
}

module.exports = { insert };
