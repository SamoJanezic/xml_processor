import { db } from "../db/db.js";
import { DataTypes, Model } from '@sequelize/core';

export class Komponenta extends Model {}
Komponenta.init(
    {
        komponenta_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        KATEGORIJA_kategorija: {
            type: DataTypes.STRING,
            references: {
                model: Model.Kategorija,
                key: "kategorija",
            }
        },
        komponenta: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'KOMPONENTA',
        tableName: 'KOMPONENTA',
        timestamps: false,
        indexes: [
            {
                unique:true,
                fields: ['komponenta', 'KATEGORIJA_kategorija']
            }
        ]
    }
)
// export const Komponenta = db.define(
//     "KOMPONENTA",
//     {
//         komponenta_id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//         },
//         KATEGORIJA_kategorija: {
//             type: DataTypes.STRING,
//             references: {
//                 model: "KATEGORIJA",
//                 key: "kategorija",
//             }
//         },
//         komponenta: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//     },
//     {
//         indexes: [
//             {
//                 unique:true,
//                 fields: ['komponenta', 'KATEGORIJA_kategorija']
//             }
//         ]
//     }
// );