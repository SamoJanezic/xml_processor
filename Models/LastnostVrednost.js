import { db } from "../db/db.js";
import { DataTypes } from "sequelize";

export const LastnostVrednost = db.define(
    "LASTNOST_VREDNOST",
    {
        dobavitelj_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        dobavitelj: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);