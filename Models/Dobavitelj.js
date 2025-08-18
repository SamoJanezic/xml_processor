import { db } from "../db/db.js";
import { DataTypes, Model } from "sequelize";

export class Dobavitelj extends Model {}
Dobavitelj.init(
    {
        dobavitelj_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        dobavitelj: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    },
    {
        sequelize: db,
        modelName: "Dobavitelj",
        tableName: "DOBAVITELJ",
        timestamps: false,
    }
);