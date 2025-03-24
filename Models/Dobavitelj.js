import { db } from "../db/db.js";
import { DataTypes, Model } from '@sequelize/core';

export class DobaviteljTabela extends Model {}
DobaviteljTabela.init(
    {
        dobavitelj_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        dobavitelj: {
            type: DataTypes.STRING,
            unique: true,
        }
    },
    {
        sequelize: db,
        modelName: 'DOBAVITELJ',
        tableName: 'DOBAVITELJ',
        timestamps: false,
    }
)
// export const DobaviteljTabela = db.define(
//     "DOBAVITELJ",
//     {
//         dobavitelj_id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         dobavitelj: {
//             type: DataTypes.STRING,
//             unique: true,
//         }
//     }
// );