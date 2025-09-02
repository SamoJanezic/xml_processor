import { Sequelize } from "sequelize";

export const db = new Sequelize({
	dialect: "sqlite",
	storage: `${process.cwd()}/db/sqlite/softtrade.db`,
	define: {
		freezeTableName: true,
		timestamps: true,
	},
});