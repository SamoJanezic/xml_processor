import { db } from "../db/db.js";
import { DataTypes } from "sequelize";

export const LastnostTip = db.define(
    "LASTNOST_TIP",
    {
        lastnost: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
    }
);