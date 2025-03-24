import { db } from "../db/db.js";
import { DataTypes, Model } from '@sequelize/core';

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
        }
    },
    {
        sequelize: db,
        modelName: 'KATEGORIJA',
        tableName: 'KATEGORIJA',
        timestamps: false,
    }
)

// export const Kategorija = db.define(
//     "KATEGORIJA",
//     {
//         kategorija_id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//         },
//         kategorija: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true
//         }
//     },
// );