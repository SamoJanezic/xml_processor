import { db } from "../db/db.js";

const LastnostTip = db.define(
    "Lastnost_tip",
    {
        lt_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        opcija: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);