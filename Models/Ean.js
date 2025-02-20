import { db } from "../db/db.js";

const Ean = db.define(
    "Ean",
    {
        ean_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ean: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }
);