import { db } from "../db/db.js";
import { DataTypes } from "sequelize";

export const IzdelekKomponenta = db.define(
    "IZDELEK_KOMPONENTA",
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        izdelek_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "IZDELEK",
                key: "ean",
            }
        },
        komponenta_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "KOMPONENTA",
                key: "komponenta_id",
            }
        },
    }
);