import { db } from "../db/db.js";
import { DataTypes } from "sequelize";

export const DobaviteljTabela = db.define(
    "DOBAVITELJ",
    {
        dobavitelj_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        dobavitelj: {
            type: DataTypes.STRING,
            primaryKey: true,
        }
    }
);