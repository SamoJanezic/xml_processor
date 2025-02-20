import { db } from "../db/db.js";

const BlagovnaZnamka = db.define(
    "Blagovna_znamka",
    {
        bz_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        blagovna_znamka: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);