import DobaviteljController from "./DobaviteljController.js";
import { AcordAttributes } from "./attriburteControllers/AcordAttributes.js";

export class AcordController extends DobaviteljController {
	constructor(categoryMap, ...args) {
		super(...args);
		this.categoryMap = categoryMap;
	}
	name = "acord";
	nodes = "podjetje.izdelki.izdelek";
	file = "acord.xml";
	encoding = "utf8";
	keys = [
		"EAN",
		"izdelekIme",
		"niPodatka",
		"opis",
		"nabavnaCena",
		"DC",
		"PPC",
		"davcnaStopnja",
		"slikaMala",
		"slikaVelika",
		"dodatneSlike",
		"dodatneLastnosti",
		"blagovnaZnamka",
		"kategorija",
		"eprel",
		"dobava",
	];

	exceptions(param) {
		const ignoreCategory = [
			"Kolutni podaljški",
			"Žarnice",
			"Zunanja svetila",
			"Namizna svetila",
			"Naglavna svetila",
			"Ročna svetila",
			"Pametne inštalacije",
			"Povečevalne lupe",
			"LED okrasitev",
			"Kabli in dodatki",
			"Svetlobni elementi",
			"Svetila",
			"Kabli in adapterji",
			"Dodatna oprema za komponente",
			"Dodatki za računalnike",
			"Dodatna oprema za monitorje",
			"Transformatorji",
			"Root catalog",
			"Ročno orodje",
			"Baterijsko orodje",
			"Multimedijski predvajalniki",
			"Omare in dodatki",
			"Omare",
			"LED zasloni",
			"Računalniške mize",
			"Polnilci",
			"Napajalni adapterji",
			//TODO
			"Zunanje naprave",
			"Orodje",
			"Optične enote",
			"Stikala",
			"Senzorji",
			"Dodatna oprema za omare",
			"Igračarski pripomočki",
			"Baterije",
			"Dodatna oprema za mrežno",
			"Dodatna oprema za projektorje",
			"Električna mobilnost",
			"Globinske 3D kamere",
			"Hubi, čitalci",
			"Mikroskopi",
			"Interaktivni zasloni",
			"Powerbank baterije",
		];
		if (
			param["EAN"] === "" ||
			param["EAN"].toString().length < 5 ||
			param["EAN"].toString().includes(" ")
		) {
			return true;
		}
		if (ignoreCategory.includes(param["kategorija"]["#text"])) {
			return true;
		}
	}

	sortCategories() {
		const flatCategoryMap = {};

		for (const [newCategory, oldCategories] of Object.entries(this.categoryMap)) {
			oldCategories.forEach(old => {
				flatCategoryMap[old] = newCategory;
			});
		}

		this.allData.forEach((el) => {
			if (flatCategoryMap[el.kategorija]) {
				el.kategorija = flatCategoryMap[el.kategorija];
			}
		})
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

	formatZaloga(zaloga) {
		return zaloga["@_id"] === "1" ? "Na zalogi" : "Ni na zalogi";
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
			const Attributes = new AcordAttributes(
				data.kategorija,
				data.dodatne_lastnosti.lastnost
			);
			const attrs = Attributes.formatAttributes();
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

	getEprel(key) {
		if (key !== undefined) {
			return key.match(/[0-9]+/g)[0];
		} else {
			return null;
		}
	}

	executeAll() {
		this.createDataObject();
		this.sortCategories();
		this.addKratki_opis();
		this.splitSlike();
		this.splitDodatneLastnosti();
		this.insertDataIntoDb();
	}
}
