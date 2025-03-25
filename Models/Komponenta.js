import { db } from "../db/db.js";
import { DataTypes } from "sequelize";

export const Komponenta = db.define(
    "KOMPONENTA",
    {
        komponenta_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        KATEGORIJA_kategorija: {
            type: DataTypes.STRING,
            references: {
                model: "KATEGORIJA",
                key: "kategorija",
            }
        },
        komponenta: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        indexes: [
            {
                unique:true,
                fields: ['komponenta', 'KATEGORIJA_kategorija']
            }
        ]
    }
);