import { db } from "../db/db.js";
import { DataTypes, Model } from "sequelize";

export class Atribut extends Model {}

Atribut.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		izdelek_ean: {
			type: DataTypes.STRING,
			references: {
				model: "IZDELEK",
				key: "ean"
			},
			allowNull: false,
		},
		KOMPONENTA_komponenta: {
			type: DataTypes.STRING(255),
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
		sequelize: db,
		modelName: "Atribut",
		tableName: "ATRIBUT",
		indexes: [
			{
				unique: true,
				fields: ["izdelek_ean", "KOMPONENTA_komponenta"],
			}
		],
		timestamps: false,
	}
)