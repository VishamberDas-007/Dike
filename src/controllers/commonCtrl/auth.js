const response = require("../../responses/response");
const db = require("../../models/index");
const services = require("../../services/services");

// creating signup function
exports.signUp = async (req, role) => {
	try {
		const signUpDetails = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		};

		// check if any of the value is undefined
		for (let key in signUpDetails) {
			if (signUpDetails[key] == undefined) {
				console.log("signUpDetails[key] = " + signUpDetails[key]);
				return response.notFound("Enter all the details");
			}
		}
		const encryptPassword = services.encrypt(signUpDetails.password);
		signUpDetails.password = encryptPassword;

		const whereClause = { email: signUpDetails.email };

		// check if the user entered is already present
		const userExist = await db.user.findOne({
			where: whereClause,
		});

		// If the user entered already exists
		if (userExist) {
			return response.alreadyExists("User already exists");
		}

		// If the user entered does not exist create user and userHasRole;
		const newUser = await db.user.build(signUpDetails).save();

		signUpDetails.userID = newUser.dataValues.id;
		signUpDetails.roleID = role;

		// Building userHasRole if new user is present
		if (newUser) {
			await db.userHasRole.create({
				userID: newUser.dataValues.id,
				roleID: signUpDetails.roleID,
			});
		}
		// returning the success response
		return response.successResponse("User Entered Successfully", signUpDetails);
	} catch (error) {
		// To catch and return if any error is present
		return response.errorResponse("Error occurred while registration", error);
	}
};

// creating signin function
exports.signIn = async (req, role) => {
	try {
		const signInDetails = {
			email: req.body.email,
			password: req.body.password,
		};

		// check if any of the value is undefined
		for (let key in signInDetails) {
			if (signInDetails[key] == undefined) {
				console.log("signInDetails[key] = " + signInDetails[key]);
				return response.notFound("Enter all the details");
			}
		}

		const whereClause = { email: signInDetails.email };

		// check if the user exists
		const userExist = await db.user.findOne({
			where: whereClause,
			include: [
				{
					model: db.userHasRole,
					where: {
						roleID: role,
					},
				},
			],
		});

		// If mailID does not exist then return
		if (!userExist) return response.notFound("User does not exists");

		// compare the password when the user mailID exists
		const compare = services.compare(
			signInDetails.password,
			userExist.dataValues.password
		);

		if (compare == false) return response.notFound("Invalid user details");

		signInDetails.password = userExist.dataValues.password;
		signInDetails.userID = userExist.dataValues.id;
		signInDetails.roleID = role;
		// generating token
		const token = services.jwtSign(signInDetails);

		signInDetails.token = token;

		return response.successResponse("Login successfull", signInDetails);
	} catch (error) {
		// To catch the error while signin if any
		response.errorResponse("Error occurred while signing in", error);
	}
};
