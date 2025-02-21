import { Sequelize } from "sequelize";

export const db = new Sequelize({
	dialect: "sqlite",
	storage: `${process.cwd()}/db/sqlite/test.db`,
	define: {
		freezeTableName: true,
		timestamps: false,
	},
});
