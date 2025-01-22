import { db } from "./db.js";

export function createTable(tableName, attr) {
	const sql = `CREATE TABLE ${tableName}(${attr})`;
	db.run(sql);
}

export function insertIntoTable(tableName, attr, values) {
	if (attr.length != values.length) {
		console.error("attributes and values are not the same length");
	}
	let markValues = attr.map((el) => {
		return "?";
	});

	const sql = `INSERT INTO ${tableName} ("${attr.join(
		'","'
	)}") VALUES (${markValues.join()})
	ON CONFLICT(ean, dobavitelj) DO UPDATE SET opis = "spremenjeno";`;
	db.run(sql, values);
}

export function dropTable(tableName) {
	const sql = `DROP TABLE ${tableName}`;
	db.run(sql);
}

export function findOne (querry, val) {
	let exists = false
	const sql = `SELECT ean FROM izdelki WHERE ${querry} = ${val}`;
	let data = db.all(sql, (err, rows) => {
		if (err) return console.error(err.message);
		console.log(rows);
	});
	return data;
}

export function clearTable() {
	const sql = `DELETE FROM izdelki`;
	db.run(sql);
}

export async function selectAll() {
	const sql = `SELECT id, ean, kategorija, izdelek_ime, opis, cena_nabavna, dealer_cena, ppc, balgovna_znamka, dobavitelj FROM izdelki`;
	return new Promise ((resolve, reject) => {
		db.all(sql, (err, rows) => {
			if(err){return  reject(err);}
			resolve(rows);
		});
	});
}

export function update(querry, val, attr, value) {
	const sql = `UPDATE izdelki SET ${attr} = ${value} WHERE ${querry} = ${val}`;
	db.run(sql);
}

export function deleteItem(id) {
	const sql = `DELETE FROM izdelki WHERE id = ${id}`;
	db.run(sql);
}

// export async function selectAll() {
// 	const sql = `SELECT * FROM izdelki`;
// 	db.all(sql, (rows, err) => {
// 		if (err) return console.error(err.message);
// 		return rows;
// 	});
// }


// export async function findOne (querry, val) {
// 	const sql = `SELECT ean, dobavitelj FROM izdelki WHERE ${querry} = ${val}`;
// 	return new Promise ((resolve, reject) => {
// 		db.all(sql, (err, rows) => {
// 			if(err){return  reject(err);}
// 			resolve(rows[0]);
// 		});
// 	})
// }
