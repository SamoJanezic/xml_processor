import { db } from "../db/db.js";
import { DataTypes } from "sequelize";

export const Dobavitelj = db.define(
    "DOBAVITELJ",
    {
        dobavitelj: {
            type: DataTypes.STRING,
            primaryKey: true,
        }
    }
);