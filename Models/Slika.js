import { db } from "../db/db.js";

const Slika = db.define(
    "Slika",
    {
        slika_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        izdelek_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        slika: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);