const bcrypt = require("bcrypt");
const config = require("../../config/default.json");
const jwt = require("jsonwebtoken");
const response = require("../responses/response");

// function to encrypt password
function encrypt(password) {
	const genSalt = bcrypt.genSaltSync(10);
	const encryptPassword = bcrypt.hashSync(password, genSalt);
	console.log(encryptPassword);
	return encryptPassword;
}

// function to compare hashed password with the current one
function compare(plaintextPassword, hash) {
	return bcrypt.compareSync(plaintextPassword, hash);
}

// function to create jwt token
function jwtSign(data) {
	const token = jwt.sign(data, config.jwt.secret, {
		expiresIn: config.jwt.expiresIn,
		algorithm: config.jwt.algorithm,
	});
	console.log({ token: token });
	return token;
}

// function to verify jwt token
function jwtVerify(req, res) {
	const token = req.headers.authorization;
	console.log({ token: token });
	if (token == undefined)
		return res.status(404).json({
			message: "Token required",
		});

	const bearerHeader = token.split(" ");
	const bearer = bearerHeader[1];
	const tokenData = jwt.verify(bearer, config.jwt.secret);
	return tokenData;
}

module.exports = { encrypt, compare, jwtSign, jwtVerify };
