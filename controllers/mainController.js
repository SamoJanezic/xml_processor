import { parser } from "./parseController.js";
import { sqlInsert } from "../db/sql.js";
import { db } from "../db/db.js";

export function insertIntoDb(obj) {
	const data = parser(obj);

	data.forEach((product) => {
		let values = obj.keys.map((key) => {
			if (key === "dobavitelj") {
				return obj.name;
			}
			if (key === "niPodatka") {
				return null;
			}
			if (product[key] === "") {
				return null;
			}
			if (product[key] === undefined) {
				return null;
			}
			if (product[key].constructor === Object) {
				return Object.values(product[key])[0];
			}
			return product[key];
		});

		db.run(sqlInsert, values, (err) => {
			if (err) {
				console.error(err);
			}
		});
	});
}
