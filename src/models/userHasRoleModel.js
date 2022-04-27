module.exports = (sequelize, Sequelize) => {
	const userHasRole = sequelize.define("userHasRole", {
		id: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		roleID: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
		},
		userID: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
		},
	});
	return userHasRole;
};
