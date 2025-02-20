import { db } from "../db/db.js";

const Cena = db.define(
    "Cena",
    {
        izdelek_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nabavna_cena: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        dealer_cena: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        redna_cena: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        ppc: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    }
);