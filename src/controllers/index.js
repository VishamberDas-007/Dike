exports.static = {
	roleCtrl: require("./roleCtrl"),
};

exports.commonCtrl = {
	auth: require("./commonCtrl/auth"),
};

exports.adminCtrl = {
	category: require("./adminCtrl/categoryCtrl"),
	product: require("./adminCtrl/productCtrl"),
};
