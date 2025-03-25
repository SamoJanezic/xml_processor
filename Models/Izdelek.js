import { db } from "../db/db.js";
import { DataTypes } from "sequelize";

export const Izdelek = db.define(
	"IZDELEK",
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
	}
);