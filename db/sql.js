import { db } from "./db.js";
import { Slika } from "../Models/Slika.js";
import { IzdelekDobavitelj } from "../Models/IzdelekDobavitelj.js";
import { Izdelek } from "../Models/Izdelek.js";
import { Kategorija } from "../Models/Kategorija.js";
import { Sequelize } from "sequelize";

export function createTable(tableName) {
	tableName
		.sync({ force: true })
		.then(() => {
			console.log(`Successfully created table ${tableName}`);
		})
		.catch((err) => {
			console.error(err);
		});
}

export function insertIntoTable(tableName, data) {
	if (data.length) {
		tableName
			.bulkCreate(data, { ignoreDuplicates: true })
			.then(() => {
				console.log(
					`Successfully inserted ${data.length} entries into ${tableName}`
				);
			})
			.catch((err) => {
				console.error(err);
			});
	} else {
		tableName
			.create(data)
			.then(() => {
				console.log(`Successfully inserted entry into ${tableName}`);
			})
			.catch((err) => {
				console.error(err);
			});
	}
}

export function selectAll(tableName, cols) {
	tableName
		.findAll({
			attributes: cols,
		})
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.error(err);
		});
}

export function updateItem(tableName, id, pairs) {
	tableName
		.update(req.body.values, {
			where: { id: req.body.values.id },
		})
		.then(() => {
			res.status(200);
		})
		.catch((err) => {
			console.error(err);
		});
}

export async function getIzdelekInfo() {
	return await db.query(
		`SELECT MIN(izdelek_ean) AS	ean,
			id,
			izdelek_ime,
			izdelek_opis,
			ppc,
			nabavna_cena,
			dealer_cena,
			blagovna_znamka,
			davcna_stopnja,
			kategorija_id,
			kategorija,
			zaloga
		FROM IZDELEK
			INNER JOIN
			IZDELEK_DOBAVITELJ ON IZDELEK.ean = IZDELEK_DOBAVITELJ.izdelek_ean
			INNER JOIN
			KATEGORIJA ON IZDELEK_DOBAVITELJ.KATEGORIJA_kategorija = KATEGORIJA.kategorija
			WHERE aktiven = 1
			GROUP BY ean`
	);
}

export async function getAtributInfo(ean) {
	return await db.query(
		`SELECT komponenta_id,
			komponenta,
			atribut
		FROM KATEGORIJA
			INNER JOIN
			KOMPONENTA ON KATEGORIJA.kategorija = KOMPONENTA.KATEGORIJA_kategorija
			INNER JOIN
			ATRIBUT ON KOMPONENTA.komponenta = ATRIBUT.KOMPONENTA_komponenta
			INNER JOIN
			IZDELEK_DOBAVITELJ ON ATRIBUT.izdelek_ean = IZDELEK_DOBAVITELJ.izdelek_ean AND
				IZDELEK_DOBAVITELJ.KATEGORIJA_kategorija = KATEGORIJA.kategorija
		WHERE IZDELEK_DOBAVITELJ.izdelek_ean = "${ean}"
		GROUP BY komponenta`
	);
}

export async function getSlikaInfo(ean) {
	return await Slika.findAll({
		attributes: ["slika_url", "tip"],
		where: {
			izdelek_ean: ean,
		},
		raw: true
	})
}


// export async function getIzdelekInfo() {
// 	IzdelekDobavitelj.belongsTo(Izdelek, { foreignKey: 'izdelek_ean' });
// 	IzdelekDobavitelj.belongsTo(Kategorija, { foreignKey: 'KATEGORIJA_kategorija', key: 'kategorija' });

//     try {
//         const izdelekInfo = await IzdelekDobavitelj.findAll({
//             attributes: [
//                 'id',
//                 'izdelek_ime',
//                 'opis_izdelka',
// 				'ppc',
// 				'nabavna_cena',
// 				'dealer_cena',
// 				'zaloga',
//             ],
//             include: [
//                 {
//                     model: Izdelek,
//                     attributes: ['ean', 'davcna_stopnja', 'blagovna_znamka'],
//                     required: true,
//                 },
// 				{
// 					model: Kategorija,
// 					attributes: ['kategorija', 'kategorija_id'],
// 					required: true,
// 					on: {
//                         '$IZDELEK_DOBAVITELJ.KATEGORIJA_kategorija$': { [Sequelize.Op.eq]: Sequelize.col('Kategorija.kategorija') }
//                     }
// 				}
//             ],
// 			raw: true
//         });
//         return izdelekInfo;
//     } catch (error) {
//         console.error('Error fetching izdelek info:', error);
//     }
// }

// export async function getSlikaInfo(ean, tip) {
// 	return await db.query(
// 		`SELECT slika_url FROM SLIKA WHERE izdelek_ean = ${ean} AND tip = "${tip}"`
// 	);
// }