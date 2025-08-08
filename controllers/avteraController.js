import DobaviteljController from "./DobaviteljController.js";
import { AvteraAttributes } from "./attriburteControllers/AvteraAttributes.js";

export class AvteraController extends DobaviteljController {
	constructor(categoryMap, ...args) {
		super(...args);
		this.categoryMap = categoryMap;
	}
	name = "avtera";
	nodes = "podjetje.izdelki.izdelek";
	file = "avtera.xml";
	encoding = "windows1250";
	keys = [
		"EAN",
		"izdelekIme",
		"niPodatka",
		"opis",
		"nabavnaCena",
		"DC",
		"PPC",
		"davcnaStopnja",
		"niPodatka",
		"slikaVelika",
		"dodatneSlike",
		"dodatneLastnosti",
		"blagovnaZnamka",
		"kategorija",
		"EprelID",
		"dobava",
	];

	exceptions(param) {
		const ignoreCategory = [
			"Dodatki",
			"Rezervni deli",
			"Torbice in ovitki za tablice",
			"Torbice",
			"Kabli in adapterji",
			"Vinske omarice",
			"Električni skuterji",
			"Dodatki za skiroje",
			"Poslovni telefoni",
			"Dodatki za telefone",
			"ReproMS",
			"Pripomočki za male živali",
			"Daljnogledi",
			"Diktafoni in dodatki",
			//TODO
			"Dodatki za fotoaparate",
			"Dodatki za tiskalnike",
			"Domači kino",
			"Fotoaparati",
			"Tiskalniški strežniki",
			"Grafične kartice",
			"Zobne ščetke in prhe",
			"Sprehajalne steze",
			"Igralni pripomočki",
		];
		if (param["EAN"] === "" || param["EAN"].toString().length < 5) {
			return true;
		}
		if (ignoreCategory.includes(param["kategorija"]["#text"])) {
			return true;
		}
	}

	sortCategories() {
		const flatCategoryMap = {};
		for (const [newCategory, oldCategories] of Object.entries(
			categoryMap
		)) {
			oldCategories.forEach((old) => {
				flatCategoryMap[old] = newCategory;
			});
		}

		this.allData.forEach((el) => {
			if (flatCategoryMap[el.kategorija]) {
				el.kategorija = flatCategoryMap[el.kategorija];
			}
		});
	}

	formatZaloga(zaloga) {
		return zaloga["@_id"] === "0" ? "Na zalogi" : "Ni na zalogi";
	}

	parseObject(obj) {
		if (obj.dodatnaSlika1) {
			return Object.values(obj);
		}
		if (!obj.hasOwnProperty("lastnost")) {
			return obj["#text"];
		}
		if (obj.lastnost) {
			return obj;
		}
	}

	splitDodatneLastnosti() {
		let lastnosti = [];

		this.allData.forEach((data) => {
			lastnosti.push({
				ean: data.ean,
				kategorija: data.kategorija,
				lastnostNaziv: "Proizvajalec",
				lastnostVrednost: data.blagovna_znamka,
			});
			const Attributes = new AvteraAttributes(
				data.kategorija,
				data.dodatne_lastnosti
			);
			let attrs = Attributes.formatAttributes();
			if (attrs !== null && Object.keys(attrs).length !== 0) {
				for (const el in attrs) {
					lastnosti.push({
						ean: data.ean,
						kategorija: data.kategorija,
						lastnostNaziv: el,
						lastnostVrednost: attrs[el],
					});
				}
			}
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
		});
	}

	splitSlike() {
		let slike = [];
		this.allData.forEach((data) => {
			if (data.slika_velika) {
				slike.push({
					izdelek_ean: data.ean,
					slika_url: data.slika_velika,
					tip: "velika",
				});
			}
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
		this.sortCategories();
		this.addKratki_opis();
		this.splitSlike();
		this.splitDodatneLastnosti();
		this.insertDataIntoDb();
	}
}
