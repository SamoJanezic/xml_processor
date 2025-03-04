import { db } from "../db/db.js";
import { DataTypes } from "sequelize";

export const Atribut = db.define(
    "ATRIBUT",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        izdelek_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "IZDELEK_DOBAVITELJ",
                key: "id"
            },
            allowNull: false
        },
        KOMPONENTA_komponenta: {
            type:DataTypes.STRING,
            references: {
                model: "KOMPONENTA",
                key: "komponenta"
            }
        },
        atribut: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        indexes: [
            {
                unique:true,
                fields: ['atribut', 'KOMPONENTA_komponenta']
            }
        ]
    }
);