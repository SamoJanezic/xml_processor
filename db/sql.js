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

// export function findOne (querry, val) {
// 	let exists = false
// 	const sql = `SELECT ean FROM izdelki WHERE ${querry} = ${val}`;
// 	db.all(sql, (err, rows) => {
// 		if (err) return console.error(err.message);
// 		exists = true;
// 	});
// 	return exists;
// }

export function clearTable() {
	const sql = `DELETE FROM izdelki`;
	db.run(sql);
}


export async function findOne (querry, val) {
	const sql = `SELECT ean, dobavitelj FROM izdelki WHERE ${querry} = ${val}`;
	return new Promise ((resolve, reject) => {
		db.all(sql, (err, rows) => {
			if(err){return  reject(err);}
			resolve(rows[0]);
		});
	})
}
