import { db } from "../db/db.js";
import { DataTypes, Model } from "sequelize";

export class IzdelekDobavitelj extends Model {}

IzdelekDobavitelj.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		izdelek_ean: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: "IZDELEK",
				key: "ean",
			},
		},
		DOBAVITELJ_dobavitelj: {
			type: DataTypes.STRING,
			references: {
				model: "DOBAVITELJ",
				key: "dobavitelj",
			},
		},
		KATEGORIJA_kategorija: {
			type: DataTypes.STRING,
			references: {
				model: "KATEGORIJA",
				key: "kategorija",
			},
		},
		izdelek_ime: {
			type: DataTypes.STRING,
		},
		izdelek_opis: {
			type: DataTypes.TEXT,
		},
		izdelek_kratki_opis: {
			type: DataTypes.TEXT,
		},
		dealer_cena: {
			type: DataTypes.FLOAT,
		},
		nabavna_cena: {
			type: DataTypes.FLOAT,
		},
		ppc: {
			type: DataTypes.FLOAT,
		},
		zaloga: {
			type: DataTypes.STRING,
		},
		aktiven: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
			allowNull: false,
		},
		spremenjen_na: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: false,
		},
	},
	{
		sequelize: db,
		modelName: "IzdelekDobavitelj",
		tableName: "IZDELEK_DOBAVITELJ",
		indexes: [
			{
				unique: true,
				fields: ["izdelek_ean", "DOBAVITELJ_dobavitelj"],
			},
		],
		timestamps: false, // Add if you don't use createdAt/updatedAt
	}
);
