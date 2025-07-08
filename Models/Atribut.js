import { db } from "../db/db.js";
import { DataTypes } from "sequelize";

export const Atribut = db.define(
	"ATRIBUT",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		izdelek_ean: {
			type: DataTypes.STRING,
			references: {
				model: "IZDELEK",
				key: "ean",
			},
			allowNull: false,
		},
		KOMPONENTA_komponenta: {
			type: DataTypes.STRING,
			references: {
				model: "KOMPONENTA",
				key: "komponenta",
			},
			allowNull: false,
		},
		atribut: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		indexes: [
			{
				unique: true,
				fields: ["izdelek_ean", "KOMPONENTA_komponenta"],
			},
		],
	}
);
