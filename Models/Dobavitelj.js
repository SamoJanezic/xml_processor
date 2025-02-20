import { db } from "../db/db.js";

const Dobavitelj = db.define(
    "Dobavitelj",
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