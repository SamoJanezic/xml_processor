import { Sequelize } from "sequelize";
import { db } from "./db.js";

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

export function insertIntoTable(tableName, obj) {
	if (obj.length) {
		tableName
			.bulkCreate(obj, {ignoreDuplicates: true})
			.then(() => {
				console.log(
					`Successfully inserted ${obj.length} entries into ${tableName}`
				);
			})
			.catch((err) => {
				console.error(err);
			});
	}
	tableName
		.create(obj)
		.then(() => {
			console.log(`Successfully inserted entry into ${tableName}`);
		})
		.catch((err) => {
			console.error(err);
		});
}

export function clearTable(tableName) {
	tableName.truncate();
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

export function deleteItem(tableName,id) {
	tableName.destroy({
		where: {
			firstName: "Jane",
		},
	});
}

export function softtradePodatki() {
	const result = db.query(
			`SELECT ean,
				blagovna_znamka,
				ime_izdelka,
				nabavna_cena,
				ppc,
				kategorija,
				komponenta,
				atribut
			FROM IZDELEK
				INNER JOIN
				IZDELEK_DOBAVITELJ ON IZDELEK.ean = IZDELEK_DOBAVITELJ.izdelek_ean
				INNER JOIN
				KATEGORIJA ON IZDELEK_DOBAVITELJ.KATEGORIJA_kategorija = KATEGORIJA.kategorija
				INNER JOIN
				KOMPONENTA ON KATEGORIJA.kategorija = KOMPONENTA.KATEGORIJA_kategorija
				INNER JOIN
				ATRIBUT ON IZDELEK.ean = ATRIBUT.izdelek_ean AND
				KOMPONENTA.komponenta = ATRIBUT.KOMPONENTA_komponenta`)
		.then(data => {
			console.log(data)
		});
}