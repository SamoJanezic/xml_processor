import { Sequelize } from "sequelize";

export const db = new Sequelize({
	dialect: "sqlite",
	storage: `${process.cwd()}/db/sqlite/softtrade.db`,
	define: {
		freezeTableName: true,
		timestamps: true,
	},
});

// const [results, metadata] = await db.query("PRAGMA table_info('ATRIBUT');");
// console.log(results);

// export const db = new Sequelize({
// 	dialect: "mariadb",
// 	username: "root",
// 	password: "st",
// 	host: "localhost",
// 	port: 3306,
// 	database: "softtrade",
// 	define: {
// 		freezeTableName: true,
// 		timestamps: true,
// 		engine: "InnoDB"
// 	},
// });

// const [cols] = await db.query("PRAGMA table_info('IZDELEK_DOBAVITELJ');");
// console.table(cols);