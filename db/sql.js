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

export async function findOne (querry, val) {
	const sql = `SELECT * FROM izdelki WHERE ${querry} = ${val}`;
	return new Promise((resolve, reject) => {
		db.all(sql, (err, row) => {
			if(err){return  reject(err);}
			resolve(row);
		});
	})
}

export function clearTable() {
	const sql = `DELETE FROM izdelki`;
	db.run(sql);
}

export async function selectAll(tableName, cols) {
	const sql = `SELECT ${cols} FROM ${tableName}`;
	return new Promise ((resolve, reject) => {
		db.all(sql, (err, rows) => {
			if(err){return  reject(err);}
			resolve(rows);
		});
	});
}

export function updateItem(id , pairs) {
	const sql = `UPDATE izdelki SET ${pairs} WHERE id = ${id}`;
	db.run(sql, (err) => {
		if(err) {
			console.error(err);
		}
	});
}

export function deleteItem(id) {
	const sql = `DELETE FROM izdelki WHERE id = ${id}`;
	db.run(sql);
}