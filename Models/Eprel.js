import { db } from "../db/db.js";

const Eprel = db.define(
    "Eprel",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        izdelek_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        eprel: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);