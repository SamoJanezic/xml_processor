import { db } from "../db/db.js";
import { DataTypes } from "sequelize";

export const Kategorija = db.define(
    "KATEGORIJA",
    {
        kategorija_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        kategorija: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
);