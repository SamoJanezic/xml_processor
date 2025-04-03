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
            allowNull: false
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
        izdelek_ime: {
            type: DataTypes.STRING,
        },
        izdelek_opis: {
            type: DataTypes.TEXT,
        },
        izdelek_kratki_opis: {
            type: DataTypes.TEXT,
        },
        dealer_cena: {
            type: DataTypes.FLOAT,
        },
        nabavna_cena: {
            type: DataTypes.FLOAT,
        },
        ppc: {
            type: DataTypes.FLOAT,
        },
        zaloga: {
            type: DataTypes.STRING,
        },
        aktiven: {
            type: DataTypes.BOOLEAN,
            default: 0,
            allowNull: false
        },
        spremenjen_na: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
    },
    {
        indexes: [
            {
                unique:true,
                fields: ['izdelek_ean', 'DOBAVITELJ_dobavitelj']
            }
        ]
    }
);