import { parser } from "./parseController.js";
import { sqlInsert } from "../db/sql.js";
import { db } from "../db/db.js";

export default class Dobavitelj {
	vrstice = [
		"izdelek_id",
		"ean",
		"izdelek_ime",
		"kratki_opis",
		"opis",
		"cena_nabavna",
		"dealer_cena",
		"ppc",
		"davčna_stopnja",
		"slika_mala",
		"slika_velika",
		"dodatne_lastnosti",
		"balgovna_znamka",
		"kategorija",
		"eprel_id",
		"dobavitelj",
	];

	insertIntoDb() {
		db.run(sqlInsert, values, (err) => {
			if (err) {
				console.error(err);
			}
		});
	}

	getData() {
		const data = parser(this.file, this.nodes);
		return data;
	}

	createObj() {
		let vrstica = this.vrstice;
		this.getData().forEach((product) => {
			let newObj = {};
			this.keys.map((key, idx) => {
				// console.log(vrstica[idx])
				if (key === "dobavitelj") {
					newObj[vrstica[idx]] = this.name;
					return newObj;
				}
				if (key === "niPodatka") {
					newObj[vrstica[idx]] = null;
					return newObj;
				}
				newObj[vrstica[idx]] = product[key];
				return newObj;
			});
			this.allData.push(newObj);
		});
	}
}
