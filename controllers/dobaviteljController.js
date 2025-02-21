import { parser } from "./parseController.js";
import { insertIntoTable } from "../db/sql.js";
import { izdelek } from "../Models/test.js";

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
		if (typeof(this.file) === "object") {
			return this.file.map(el => {return parser(el.fileName, el.node)});
		}
		const data = parser(this.file, this.nodes, this.encoding);
		return data;
	}

	createDataObject() {
		let vrstica = this.vrstice;
		let getData = this.getData();

		if(this.name === 'asbis') {
			getData = this.combineData();
		}

		getData.forEach((product) => {
			let newObj = {};

			if (this.exceptions(product)) {
				return;
			}

			this.keys.map((key, idx) => this.keyRules(newObj, product, key, idx, vrstica));
			this.allData.push(newObj);
		});
	}

	keyRules(obj, product, key, idx, vrstica) {
		if (key === "dobavitelj") {
			obj[vrstica[idx]] = this.name;
		} else if (key === "eprel") {
			obj[vrstica[idx]] = this.getEprel(product[key]);
		} else if (key === "niPodatka" || product[key] === "") {
			obj[vrstica[idx]] = null;
		} else if (typeof product[key] === "object") {
			obj[vrstica[idx]] = this.parseObject(product[key]);
		} else {
			obj[vrstica[idx]] = product[key];
		}
		return obj;
	};

	insertDataIntoDb() {
		insertIntoTable(izdelek, this.allData);
	}

	parseObject(obj) {
		let str = "";
		if (obj.dodatnaSlika1) {
			return obj.dodatnaSlika1;
		}
		if (!obj.hasOwnProperty("lastnost")) {
			return obj["#text"];
		}
		if (!obj.lastnost.length) {
			return (str += obj.lastnost["@_naziv"] + ": " + obj.lastnost["#text"]);
		}
		obj.lastnost.forEach((el) => {
			str += el["@_naziv"].replace(":", "") + ": " + el["#text"] + " | ";
		});
		return str;
	}

	// removeHTMLTags (str) {
	// 	return str.replace(/(<([^>]+)>)/gi, "");
	// }

	addKratki_opis() {
		this.allData.forEach((el) => {
			// if (el['eprel_id']) {
			// 	el['eprel_id'] = this.removeHTMLTags(el['eprel_id']);
			// }
			if (el["opis"] !== null) {
				el["kratki_opis"] =
					el["opis"].substring(0, 100).replace(/(<([^>]+)>)/gi, "") +
					"...";
			}
		});
	}
}
