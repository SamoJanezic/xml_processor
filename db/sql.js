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
	)}") VALUES (${markValues.join()})`;
	db.run(sql, values);
}

export function dropTable(tableName) {
	const sql = `DROP TABLE ${tableName}`;
	db.run(sql);
}

export function findOne(querry, val) {
	const sql = `SELECT * FROM izdelki WHERE ${querry} = ${val}`;
	db.all(sql, (err, rows) => {
		if (err) return console.error(err.message);

		console.log(Boolean(rows[0]));
	});
}
