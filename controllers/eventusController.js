import DobaviteljController from "./DobaviteljController.js";
import EventusAttributes from "./attriburteControllers/EventusAttributes.js";
import eventusCategoryMap from './categoryMaps/eventusCategory.js';

export class EventusController extends DobaviteljController {
	constructor(categoryMap, ...args) {
		super(...args);
		this.categoryMap = categoryMap;
	}
	name = "eventus";
	nodes = "podjetje.izdelki.izdelek";
	file = "eventus.xml";
	encoding = "utf8";
	keys = [
		"EAN",
		"izdelekIme",
		"kratek_opis",
		"opis",
		"nabavnaCena",
		"DC",
		"PPC",
		"davcnaStopnja",
		"slikaVelika",
		"slikaVelika",
		"dodatneSlike",
		"dodatneLastnosti",
		"blagovnaZnamka",
		"kategorija",
		"niPodatka",
		"dobava",
	];

	exceptions(param) {
		const ignoreCategory = [
			"Odprodaja %",
			"LED osvetlitev",
			"Rezervni deli",
			"GLS",
			"Polnilne baterije in postaje",
			"Varnostni dodatki",
			"Stojala",
			"Polnilne baterije",
			"Oprema za telefone in ure",
			"Polnilci",
			"Zvočne kartice",
			"Pisala, stojala in dodatki",
			"Čistila za tehniko",
			"Strojne denarnice",
			"Varnostne kopije in dodatki",
		];
		if (ignoreCategory.includes(param["kategorija"]["#text"])) {
			return true;
		}
		// if (param["kategorija"]["#text"] === "Rezervni deli") {
		// 	return true;
		// }
	}

	sortCategory() {
		// Build flat map
		const flatCategoryMap = {};
		for (const [newCategory, oldCategories] of Object.entries(eventusCategoryMap)) {
			oldCategories.forEach(old => {
				flatCategoryMap[old] = newCategory;
			});
		}

		this.allData.forEach((el) => {
			if (flatCategoryMap[el.kategorija]) {
				el.kategorija = flatCategoryMap[el.kategorija];
			}
		});
	}

	parseObject(obj) {
		let str = "";
		if (obj.dodatnaSlika1) {
			return Object.values(obj);
		}
		if (!obj.hasOwnProperty("lastnost")) {
			return obj["#text"];
		}
		if (obj.lastnost) {
			return obj;
		}
		return str;
	}

	formatZaloga(zaloga) {
		return zaloga["@_id"] === "1" ? "Ni na zalogi" : "Na zalogi";
	}

	splitDodatneLastnosti() {
		let lastnosti = [];

		this.allData.forEach((data) => {
			if (data.dodatne_lastnosti?.lastnost) {
				const Attributes = new EventusAttributes(data.kategorija, data.dodatne_lastnosti.lastnost);
				const attrs = Attributes.formatAttributes();

				// console.log(attrs);
			}
		});
		this.komponenta = lastnosti.map((el) => {
			return {
				KATEGORIJA_kategorija: el.kategorija,
				komponenta: el.lastnostNaziv,
			};
		});
		this.atribut = lastnosti.map((el) => {
			return {
				izdelek_ean: el.ean,
				KOMPONENTA_komponenta: el.lastnostNaziv,
				atribut: el.lastnostVrednost,
			};
		});
	}

	splitSlike() {
		let slike = [];
		this.allData.forEach((data) => {
			slike.push({
				izdelek_ean: data.ean,
				slika_url: data.slika_mala,
				tip: "mala",
			});
			slike.push({
				izdelek_ean: data.ean,
				slika_url: data.slika_velika,
				tip: "velika",
			});
			if (data.dodatne_slike) {
				data.dodatne_slike.forEach((el) => {
					slike.push({
						izdelek_ean: data.ean,
						slika_url: el,
						tip: "dodatna",
					});
				});
			}
		});
		this.slika = slike;
	}

	getEprel(key) {}

	executeAll() {
		this.createDataObject();
		this.sortCategory();
		this.splitSlike();
		this.splitDodatneLastnosti();
		this.insertDataIntoDb();
	}
}
