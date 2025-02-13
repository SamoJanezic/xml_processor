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
			if (this.exceptions(product)) {
				return;
			}

			if(product.dodatneLastnosti && product.dodatneLastnosti.lastnost && Array.isArray(product.dodatneLastnosti.lastnost)) {
				product.dodatneLastnosti.lastnost.forEach(el => {
					if (el['@_naziv'] === "Energijska nalepka") {
						// let eprel = el['#text'].match(/[0-9]+/g)
						// console.log(eprel)
					}
				})
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
