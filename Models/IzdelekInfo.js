import { db } from "../db/db.js";

const IzdelekInfo = db.define(
    "Izdelek_info",
    {
        izdelek_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        dobavitelj_id: {
            type: DataTypes.INTEGER,
        },
        blagovna_znamka_id: {
            type: DataTypes.INTEGER,
        },
        ean_id: {
            type: DataTypes.INTEGER,
        },
        kategorija_id: {
            type: DataTypes.INTEGER,
        },
    }
);