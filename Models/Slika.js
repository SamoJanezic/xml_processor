// import { db } from "../db/db.js";
// import { DataTypes } from "sequelize";

// export const Slika = db.define(
//     "SLIKA",
//     {
//         slika_id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         izdelek_ean: {
//             type: DataTypes.STRING,
//             references: {
//                 model: 'IZDELEK',
//                 key: 'ean',
//             },
//             allowNull: false,
//         },
//         slika_url: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         tip: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//     }
// );

import { db } from "../db/db.js";
import { DataTypes, Model } from "sequelize";

export class Slika extends Model {}

Slika.init(
    {
        slika_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        izdelek_ean: {
            type: DataTypes.STRING,
            references: {
                model: 'IZDELEK',
                key: 'ean',
            },
            allowNull: false,
        },
        slika_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tip: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize: db,
        modelName: "Slika",
        tableName: "SLIKA",
        timestamps: false,
    }
);