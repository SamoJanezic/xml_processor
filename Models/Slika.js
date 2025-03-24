import { db } from "../db/db.js";
import { DataTypes, Model } from "@sequelize/core";

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
				model: Model.IzdelekDobavitelj,
				key: "ean",
			},
			allowNull: false,
		},
		slika_url: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		tip: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize: db,
		modelName: "SLIKA",
		tableName: "SLIKA",
		timestamps: false,
	}
);
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
//                 model: 'IZDELEK_DOBAVITELJ',
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

// Slika.belongsTo(IzdelekDobavitelj, { foreignKey: 'izdelek_ean' });
