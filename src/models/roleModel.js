module.exports = (sequelize, Sequelize) => {
	const roles = sequelize.define("role", {
		id: {
			type: Sequelize.INTEGER(11),
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: Sequelize.STRING(30),
			unique: true,
		},
	});
	return roles;
};
