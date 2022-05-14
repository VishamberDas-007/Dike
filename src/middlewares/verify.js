const services = require("../services/services");

function isAdmin(req, res, next) {
	const tokenData = services.jwtVerify(req, res);

	// check if the tokenData has the same roleID as of Admin
	// If not then return invalid attempt to access
	if (tokenData.roleID != 1)
		return res.status(404).json({ message: "Invalid attempt to access" });

	return next();
}

function isCustomer(req, res, next) {
	const tokenData = services.jwtVerify(req, res);

	// check if the tokenData has the same roleID as of Customer
	// If not then return invalid attempt to access
	if (tokenData.roleID != 2)
		return res.status(404).json({ message: "Invalid attempt to access" });

	return next();
}

function isTransporter(req, res, next) {
	const tokenData = services.jwtVerify(req, res);

	// check if the tokenData has the same roleID as of Transporter
	// If not then return invalid attempt to access
	if (tokenData.roleID != 3)
		return res.status(404).json({ message: "Invalid attempt to access" });

	return next();
}

module.exports = { isAdmin, isCustomer, isTransporter };
