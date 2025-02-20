import { db } from "../db/db.js";

const Izdelek = db.define(
	"Izdelek",
	{
        izdelek_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
		ime: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		opis: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}
);