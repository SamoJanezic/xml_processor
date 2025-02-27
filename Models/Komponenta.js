import { db } from "../db/db.js";
import { DataTypes } from "sequelize";

export const Komponenta = db.define(
    "KOMPONENTA",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        komponenta: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        KATEGORIJA_kategorija: {
            type: DataTypes.STRING,
            references: {
                model: "KATEGORIJA",
                key: "kategorija",
            }
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