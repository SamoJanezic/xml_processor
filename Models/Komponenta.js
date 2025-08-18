// import { db } from "../db/db.js";
// import { DataTypes } from "sequelize";

// export const Komponenta = db.define(
//     "KOMPONENTA",
//     {
//         komponenta_id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true, // Recommended for MSSQL PKs
//         },
//         KATEGORIJA_kategorija: {
//             type: DataTypes.STRING,
//             allowNull: false,
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
//                 unique: true,
//                 fields: ['komponenta', 'KATEGORIJA_kategorija']
//             }
//         ]
//     }
// );

import { db } from "../db/db.js";
import { DataTypes, Model } from "sequelize";

export class Komponenta extends Model {}
Komponenta.init(
    {
        komponenta_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        KATEGORIJA_kategorija: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "KATEGORIJA",
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
        modelName: "Komponenta",
        tableName: "KOMPONENTA",
        indexes: [
            {
                unique: true,
                fields: ["komponenta", "KATEGORIJA_kategorija"]
            }
        ],
        timestamps: false,
    }
)