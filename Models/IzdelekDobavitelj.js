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
        ime_izdelka: {
            type: DataTypes.STRING,
        },
        opis_izdelka: {
            type: DataTypes.TEXT,
        },
        kratki_opis_izdelka: {
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
        }
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