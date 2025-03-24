import { db } from "../db/db.js";
import { DataTypes, Model } from '@sequelize/core';

export class IzdelekKomponenta extends Model {}
IzdelekKomponenta.init(
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        izdelek_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Model.Izdelek,
                key: "ean",
            }
        },
        komponenta_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Model.komponenta,
                key: "id",
            }
        }
    },
    {
        sequelize: db,
        modelName: 'IZDELEK_KOMPONENTA',
        tableName: 'IZDELEK_KOMPONENTA',
        timestamps: false,
    }
)

// export const IzdelekKomponenta = db.define(
//     {
//         id: {
//             primaryKey: true,
//             autoIncrement: true,
//             type: DataTypes.INTEGER,
//         },
//         izdelek_id: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             references: {
//                 model: Model.Izdelek,
//                 key: "ean",
//             }
//         },
//         komponenta_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: Model.komponenta,
//                 key: "id",
//             }
//         },
//     },
//     {
//         sequelize: db,
//         modelName: 'IZDELEK_KOMPONENTA',
//         tableName: 'IZDELEK_KOMPONENTA',
//         timestamps: false,
//     }
// );