// import { db } from "../db/db.js";
// import { DataTypes } from "sequelize";

// export const Kategorija = db.define(
//     "KATEGORIJA",
//     {
//         kategorija_id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         kategorija: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true
//         },
//         marza: {
//             type: DataTypes.FLOAT,
//             allowNull: false,
//         }
//     },
// );

import { db } from "../db/db.js";
import { DataTypes, Model } from "sequelize";

export class Kategorija extends Model {}
Kategorija.init(
    {
        kategorija_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        kategorija: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        marza: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },
    {
        sequelize: db,
        modelName: "Kategorija",
        tableName: "KATEGORIJA",
        timestamps: false,
    }
)