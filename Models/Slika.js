import { db } from "../db/db.js";
import { DataTypes } from "sequelize";

export const Slika = db.define(
    "SLIKA",
    {
        slika_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        izdelek_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'IZDELEK_DOBAVITELJ',
                key: 'id',
            },
            allowNull: false,
        },
        slika_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tip: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }
);