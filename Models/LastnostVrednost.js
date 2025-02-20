import { db } from "../db/db.js";

const LastnostVrednost = db.define(
    "Lastnost_vrednost",
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