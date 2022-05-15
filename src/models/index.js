const Sequelize = require("sequelize");
const config = require("../../config/default.json");

const sequelize = new Sequelize(
	config.mysql.database,
	config.mysql.username,
	config.mysql.password,
	{
		host: config.mysql.host,
		dialect: config.mysql.dialect,
	}
);

var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.role = require("./roleModel")(sequelize, Sequelize); // role model is imported
db.user = require("./userModel")(sequelize, Sequelize); // user model is imported
db.userHasRole = require("./userHasRoleModel")(sequelize, Sequelize); // userHasRole model is imported
db.category = require("./categoryModel")(sequelize, Sequelize); // category model is imported
db.product = require("./productModel")(sequelize, Sequelize); // product model is imported

// relations between the models to be defined here

// userHasRole and role table relation
db.userHasRole.belongsTo(db.role, {
	foreignKey: "roleID",
	onUpdate: "CASCADE",
	onDelete: "CASCADE",
});

// user and userHasRole table relation
db.user.hasOne(db.userHasRole, {
	foreignKey: "userID",
	onUpdate: "CASCADE",
	onDelete: "CASCADE",
});

// product and category table relations
db.product.belongsTo(db.category, {
	foreignKey: "catID",
	onUpdate: "CASCADE",
	onDelete: "CASCADE",
});

db.category.hasMany(db.product, {
	foreignKey: "catID",
	onUpdate: "CASCADE",
	onDelete: "CASCADE",
});

module.exports = db; // db is exported
