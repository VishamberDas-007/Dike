module.exports = (sequelize, Sequelize) => {
	const product = sequelize.define("product", {
		id: {
			type: Sequelize.INTEGER(11),
			autoIncrement: true,
			primaryKey: true,
		},
		catID: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
		},
		name: {
			type: Sequelize.STRING(50),
			allowNull: false,
			unique: true,
		},
		imageName: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
		description: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
		status: {
			type: Sequelize.ENUM("Active", "Inactive"),
			defaultValue: "Active",
		},
	});
	return product;
};
