import { db } from "../db/db.js";
import { DataTypes, Model } from '@sequelize/core';

export class Izdelek extends Model {}
Izdelek.init(
	{
		ean: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		eprel: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		davcna_stopnja: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		blagovna_znamka: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		sequelize: db,
		modelName: 'IZDELEK',
		tableName: 'IZDELEK',
		timestamps: false,
	}
)
// export const Izdelek = db.define(
// 	"IZDELEK",
// 	{
//         ean: {
//             type: DataTypes.STRING,
//             primaryKey: true,
// 			allowNull: false,
//         },
// 		eprel: {
// 			type: DataTypes.STRING,
// 			allowNull: true,
// 		},
// 		davcna_stopnja: {
// 			type: DataTypes.INTEGER,
// 			allowNull: false,
// 		},
// 		blagovna_znamka: {
// 			type: DataTypes.STRING,
// 			allowNull: true,
// 		},
// 	}
// );