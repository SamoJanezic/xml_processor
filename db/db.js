import { Sequelize } from "sequelize";

export const db = new Sequelize({
	dialect: "sqlite",
	storage: `${process.cwd()}/db/sqlite/softtrade.db`,
	define: {
		freezeTableName: true,
		timestamps: false,
	},
});

// export const db = new Sequelize('Softtrade', 'sam', 'admin', {
//     host: 'localhost',         // or your SQL Server host
//     dialect: 'mssql',
//     port: 1433,                // default MSSQL port
//     dialectOptions: {
//         options: {
//             encrypt: false,     // for Azure, set to false for local
//             trustServerCertificate: true // change to true for local dev / self-signed certs
//         }
//     },
//     define: {
//         freezeTableName: true,
//         timestamps: false,
//     },
// });
