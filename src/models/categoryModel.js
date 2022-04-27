module.exports = (sequelize, Sequelize) => {
	const category = sequelize.define("categories", {
		id: {
			type: Sequelize.INTEGER(11),
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: Sequelize.STRING(50),
			allowNull: false,
			unique: true,
		},
	});
	return category;
};
