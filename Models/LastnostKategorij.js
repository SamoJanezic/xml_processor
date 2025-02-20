import { db } from "../db/db.js";

const OpcijeKategorij = db.define(
    "Opcije_kategorij",
    {
        ok_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        kategorija_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        opcija_tip_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }
);