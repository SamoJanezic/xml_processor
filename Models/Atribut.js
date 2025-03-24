import { db } from "../db/db.js";
import { DataTypes, Model } from "@sequelize/core";


export class Atribut extends Model {}
Atribut.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		izdelek_ean: {
			type: DataTypes.STRING,
			references: {
				model: Model.Izdelek,
				key: "ean",
			},
			allowNull: false,
		},
		KOMPONENTA_komponenta: {
			type: DataTypes.STRING,
			references: {
				model: Model.Komponenta,
				key: "komponenta",
			},
		},
		atribut: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize: db,
		modelName: "ATRIBUT",
		tableName: "ATRIBUT",
		timestamps: false,
		indexes: [
			{
				unique: true,
				fields: ["izdelek_ean", "atribut", "KOMPONENTA_komponenta"],
			},
		],
	}
)
// export const Atribut = db.define(
// 	"ATRIBUT",
// 	{
// 		id: {
// 			type: DataTypes.INTEGER,
// 			primaryKey: true,
// 			autoIncrement: true,
// 		},
// 		izdelek_ean: {
// 			type: DataTypes.STRING,
// 			references: {
// 				model: "IZDELEK",
// 				key: "ean",
// 			},
// 			allowNull: false,
// 		},
// 		KOMPONENTA_komponenta: {
// 			type: DataTypes.STRING,
// 			references: {
// 				model: "KOMPONENTA",
// 				key: "komponenta",
// 			},
// 		},
// 		atribut: {
// 			type: DataTypes.STRING,
// 			allowNull: true,
// 		},
// 	},
// 	{
// 		indexes: [
// 			{
// 				unique: true,
// 				fields: ["izdelek_ean", "atribut", "KOMPONENTA_komponenta"],
// 			},
// 		],
// 	}
// );
