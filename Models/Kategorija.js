import { db } from "../db/db.js";

const Kategorija = db.define(
    "Kategorija",
    {
        kategorija_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        kategorija: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);