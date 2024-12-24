import { parser } from "./parseController.js";
import { insertIntoTable } from "../db/sql.js";

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
		"davcna_stopnja",
		"slika_mala",
		"slika_velika",
		"dodatne_lastnosti",
		"balgovna_znamka",
		"kategorija",
		"eprel_id",
		"dobavitelj",
	];
	allData = [];

	getData() {
		const data = parser(this.file, this.nodes, this.encoding);
		return data;
	}

	createObj() {
		let vrstica = this.vrstice;
		this.getData().forEach((product) => {
			if (this.exceptions(product)) {
				return;
			}

			let newObj = {};

			this.keys.map((key, idx) => {
				if (key === "dobavitelj") {
					newObj[vrstica[idx]] = this.name;
				} else if (key === "niPodatka" || product[key] === "") {
					newObj[vrstica[idx]] = null;
				} else if (typeof product[key] === "object") {
					newObj[vrstica[idx]] = this.parseObject(product[key]);
				} else {
					newObj[vrstica[idx]] = product[key];
				}
				return newObj;
			});
			this.allData.push(newObj);
		});
	}

	insertDataIntoDb() {
		this.allData.forEach((el) => {
			let arr = [];
			for (let key in el) {
				arr.push(el[key]);
			}
			try {
				insertIntoTable("izdelki", this.vrstice, arr);
			} catch {
				(err) => console.error(err);
			}
		});
	}

	parseObject(obj) {
		let str = "";
		if (!obj.hasOwnProperty("lastnost")) {
			return obj["#text"];
		}
		if (!obj.lastnost.length) {
			return (str +=
				obj.lastnost["@_naziv"] + ": " + obj.lastnost["#text"]);
		}
		obj.lastnost.forEach((el) => {
			str += el["@_naziv"].replace(":", "") + ": " + el["#text"] + " | ";
		});
		return str;
	}

	addKratki_opis() {
		this.allData.forEach((el) => {
			if (el["opis"] !== null) {
				el["kratki_opis"] =
					el["opis"].substring(0, 100).replace(/(<([^>]+)>)/gi, "") +
					"...";
			}
		});
	}
}
