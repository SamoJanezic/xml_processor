import { db } from "../db/db.js";
import { DataTypes } from "sequelize";

export const izdelekTest = db.define(
    "IzdelekTest",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        izdelek_id: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        ean: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        izdelek_ime: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        kratki_opis: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        opis: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        cena_nabavna: {
            type: DataTypes.FLOAT,
            // allowNull: false,
        },
        dealer_cena: {
            type: DataTypes.FLOAT,
            // allowNull: false,
        },
        ppc: {
            type: DataTypes.FLOAT,
            // allowNull: false,
        },
        davcna_stopnja: {
            type: DataTypes.FLOAT,
            // allowNull: false,
        },
        slika_mala: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        slika_velika: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        dodatne_lastnosti: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        balgovna_znamka: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        kategorija: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        eprel_id: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        dobavitelj: {
            type: DataTypes.STRING,
            // allowNull: false,
        }
    }
);