import { db } from "../db/db.js";
import { DataTypes } from "sequelize";

export const Atribut = db.define(
    "ATRIBUT",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        KATEGORIJA_kategorija: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "KATEGORIJA",
                key: "id",
            },
        }
    }
);