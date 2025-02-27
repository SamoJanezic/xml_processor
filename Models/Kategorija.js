import { db } from "../db/db.js";
import { DataTypes } from "sequelize";

export const Kategorija = db.define(
    "KATEGORIJA",
    {
        kategorija: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        }
    },
);