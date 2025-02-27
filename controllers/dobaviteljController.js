import { db } from "../db/db.js";
import { parser } from "./parseController.js";
import { insertIntoTable } from "../db/sql.js";
import { Izdelek } from "../Models/Izdelek.js";
import { IzdelekDobavitelj } from "../Models/IzdelekDobavitelj.js";
import { izdelekTest } from "../Models/test.js";
import { Kategorija } from "../Models/Kategorija.js";
import { DobaviteljTabela } from "../Models/Dobavitelj.js"
import { Komponenta } from "../Models/Komponenta.js";

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
		"blagovna_znamka",
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

	async insertDataIntoDb() {
		const komponenta = this.splitDodatneLastnosti();

		const izdelekData = this.allData.map(el => {
			return {
				ean: el.ean,
				eprel: el.eprel_id,
				davcna_stopnja: 22,
				blagovna_znamka: el.blagovna_znamka
			}
		});

		const izdelekDobaviteljData = this.allData.map(el => {
			return {
				izdelek_ean: el.ean,
				ime_izdelka: el.izdelek_ime,
				KATEGORIJA_kategorija: el.kategorija,
				DOBAVITELJ_dobavitelj: el.dobavitelj,
				opis_izdelka: el.opis,
				kratki_opis_izdelka: el.kratki_opis,
				nabavna_cena: el.cena_nabavna,
				dealer_cena: el.dealer_cena,
				ppc: el.ppc
			}
		});

		const kategorijaData = this.allData.map(el => {
			return {kategorija: el.kategorija};
		});


		db.sync({alter: true});
		insertIntoTable(DobaviteljTabela, {dobavitelj: this.name});
		insertIntoTable(Izdelek, izdelekData);
		insertIntoTable(IzdelekDobavitelj, izdelekDobaviteljData);
		insertIntoTable(Kategorija, kategorijaData);
		insertIntoTable(Komponenta, komponenta);

	}



	// removeHTMLTags (str) {
	// 	return str.replace(/(<([^>]+)>)/gi, "");
	// }

	addKratki_opis() {
		let count = 0
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
