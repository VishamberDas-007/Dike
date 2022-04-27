const response = {
	message: "",
	status: 200,
	error: "",
	data: "",
};

function alreadyExists(message) {
	response.status = 409;
	response.message = message;
	response.error = "";
	response.data = "";
	return response;
}

function successResponse(message, data) {
	response.message = message;
	response.status = 200;
	response.error = "";
	response.data = data;
	return response;
}

function errorResponse(message, error) {
	response.message = message;
	response.error = error;
	response.status = 500;
	response.data = "";
	return response;
}

function notFound(message) {
	response.message = message;
	response.status = 404;
	response.data = "";
	response.error = "";
	return response;
}

module.exports = { alreadyExists, successResponse, errorResponse, notFound };
