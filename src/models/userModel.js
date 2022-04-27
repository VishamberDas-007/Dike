module.exports = (sequelize, Sequelize) => {
	const user = sequelize.define("users", {
		id: {
			type: Sequelize.INTEGER(11),
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: Sequelize.STRING(50),
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING(320),
			allowNull: false,
			unique: true,
		},
		password: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
	});
	return user;
};
