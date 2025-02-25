import { db } from "../db/db.js";
import { DataTypes } from "sequelize";

export const IzdelekDobavitelj = db.define(
    "IZDELEK_DOBAVITELJ",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        izdelek_ean: {
            type: DataTypes.STRING,
            references: {
                model: "IZDELEK",
                key: "ean",
            },
        },
        DOBAVITELJ_dobavitelj: {
            type: DataTypes.STRING,
            references: {
                model: "DOBAVITELJ",
                key: "dobavitelj",
            },
        },
        KATEGORIJA_kategorija: {
            type: DataTypes.STRING,
            references: {
                model: "KATEGORIJA",
                key: "kategorija",
            }
        },
        ime_izdelka: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        opis_izdelka: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        kratki_opis_izdelka: {
            type: DataTypes.TEXT,
            allowNull: false,
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