import { db } from "../db/db.js";
import { DataTypes, Model } from "sequelize";


export class Izdelek extends Model {}

Izdelek.init(
	{
		ean: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		eprel: {
			type: DataTypes.STRING,
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
		modelName: "Izdelek",
		tableName: "IZDELEK",
	}
);
