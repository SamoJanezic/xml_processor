import { db } from "../db/db.js";
import { DataTypes } from "sequelize";

export const Izdelek = db.define(
	"IZDELEK",
	{
        ean: {
            type: DataTypes.INTEGER,
            primaryKey: true,
			allowNull: false,
        },
		eprel: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		davcna_stopnja: {
			type: DataTypes.REAL,
			allowNull: false,
		},
		blagovna_znamka: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}
);