import DobaviteljController from "./DobaviteljController.js";
import { AlsoAttributes } from "./attriburteControllers/AlsoAttributes.js";

export class AlsoController extends DobaviteljController {
	constructor(categoryMap, ...args) {
		super(...args);
		this.categoryMap = categoryMap;
	}
	name = "also";
	nodes = "xmlData.product";
	file = "also.xml";
	encoding = "utf8";
	keys = [
		"product.idents.ident[2]['@_value']",
		"product.base.name",
		"product.base.longname",
		"product.attributes.marketingtext['#text']",
		"product.prices.price[0]['@_value']",
		"product.prices.price[1]['@_value']",
		"product.prices.price[2]['@_value']",
		"product.prices.tax['@_rate']",
		"niPodatka",
		"niPodatka",
		"product.pictures.picture",
		"product.attributes.specification",
		"product.base.vendor['#text']",
		"product.base.categoryName['#text']",
		"product.eprel",
		"product.stock.quantity['#text']",
	];

	keyRules(obj, product, key, idx, vrstica) {
		if (vrstica[idx] === "zaloga") {
			obj[vrstica[idx]] = this.formatZaloga(eval(key));
		} else if (key === "niPodatka" || eval(key) === "" || !eval(key)) {
			obj[vrstica[idx]] = null;
		} else {
			obj[vrstica[idx]] = eval(key);
		}
		return obj;
	}

	exceptions(param) {
		const ignoreCategory = [
			" /  / ",
			"Garancije & storitve / Garancije & podpora / Garancija za UPS",
			"Garancije & storitve / Garancije & podpora / Garancije za prenosnike",
			"Garancije & storitve / Garancije & podpora / Garancije za PC",
			"Garancije & storitve / Garancije & podpora / Garancije za monitorje",
			"Garancije & storitve / Garancije & podpora / Printer & MFP garancije",
			"Avdio, video, monitorji & TV / Dodatki / Avdio, video adapterji & kabli",
			"Garancije & storitve / Garancije & podpora / Garancije za mrežno opremo",
			"Garancije & storitve / Garancije & podpora / Garancije za sistem konferenc",
			"Garancije & storitve / Garancije & podpora / Garancije tiskalnika velikega formata",
			"Garancije & storitve / Garancije & podpora / Garancije za skenerje",
			"Garancije & storitve / Garancije & podpora / Strežniške garancije",
			"Garancije & storitve / Garancije & podpora / Garancije za digitalno podpisovanje",
			"Garancije & storitve / Garancije & podpora / Garancije projektorjev",
			"Omrežje & Smart Home / Omrežna dodatna oprema / Omrežni & DAC kabli",
			"Izdelki za električno energijo / Akumulator / Akumulator",
			"Izdelki za električno energijo / Paneli / Paneli",
			"Periferija & dodatki / Kabli & adapterji / Adapterji",
			"Periferija & dodatki / Kabli & adapterji / Kabli - Drugi",
			"Periferija & dodatki / Kabli & adapterji / Kabli - Ključavnice",
			"Periferija & dodatki / Kabli & adapterji / Kabli - Napajanje",
			"Periferija & dodatki / Kabli & adapterji / Kabli - USB & Thunderbolt",
			"Periferija & dodatki / Kabli & adapterji / USB razdelilci",
			"Komponente / Krmilniki / Adapterji (HBA)",
			"Avdio, video, monitorji & TV / Dodatki / Filtri zasebnosti",
			"Avdio, video, monitorji & TV / Dodatki / Avdio & video dodatki",
			"Avdio, video, monitorji & TV / Dodatki / Kamere, Droni, Spletne kamere - Baterije",
			"Komponente / Dodatki za komponente / Dodatki za shranjevanje",
			"Tiskanje, optično branje & potrošni mat. / Tiskalniki velikega formata (LFP) / Dodatna oprema za velike formate",
			"Tiskanje, optično branje & potrošni mat. / Tiskalniki, optični bralnik, dodatna opr / Stojala",
			"Tiskanje, optično branje & potrošni mat. / Tiskalniki, optični bralnik, dodatna opr / Dodatki za matrične tiskalnike",
			"Tiskanje, optično branje & potrošni mat. / Kopiranje & faks / Oprema za kopiranje in telefaks",
			"Tiskanje, optično branje & potrošni mat. / Tiskalniki, optični bralnik, dodatna opr / Napajalniki",
			"Prenosniki, PC & Tablični računalniki / Dodatki / Napajalniki za prenosne računalnike",
			"Avdio, video, monitorji & TV / Televizorji / Dodatki za televizorje",
			"Garancije & storitve / Garancije & podpora / Garancije za tablične računalnike",
			"Komponente / Ventilatorji & hladilni sistemi / Fanless ventilatorji & hladilniki",
			"Izobraževanje / Predstavitev EDU / Dodatna oprema za predstavitv EDU",
			"Strežniki, diskovna polja & UPS / Dodatki / PDU dodatke",
			"Komponente / Krmilniki / Drugi krmilniki",
			"Omrežje & Smart Home / Mrežna oprema / Stikala - ohišja",

		];
		if (
			(param.prices.price[0]["@_value"] ||
				param.prices.price[1]["@_value"] ||
				param.prices.price[2]["@_value"]) === "0"
		) {
			return true;
		}
		if (ignoreCategory.includes(param["base"]["categoryName"]["#text"])) {
			return true;
		}
		if (param["@_id"] === "23370") {
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
		});
	}

	formatZaloga(zaloga) {
		return zaloga !== "0 kos" ? "Na zalogi" : "Ni na zalogi";
	}

	splitDodatneLastnosti() {
		let lastnosti = [];
		this.allData.forEach((data) => {
			lastnosti.push({ean: data.ean, kategorija: data.kategorija, lastnostNaziv: 'Proizvajalec', lastnostVrednost: data.blagovna_znamka});
			if(data.dodatne_lastnosti) {
				const Attributes = new AlsoAttributes(data.kategorija, data.dodatne_lastnosti);
				const attrs = Attributes.formatAttributes()
				if (Object.keys(attrs).length) {
					for (const el in attrs) {
						lastnosti.push({ean: data.ean, kategorija: data.kategorija, lastnostNaziv: el, lastnostVrednost: attrs[el]});
					}
				}
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


	// splitDodatneLastnosti() {

	// 	let lastnosti = [];
	// 	this.allData.forEach((data) => {
	// 		if(data.dodatne_lastnosti) {
	// 			data.dodatne_lastnosti.forEach(el => {
	// 				lastnosti.push({
	// 					ean: data.ean,
	// 					kategorija: data.kategorija,
	// 					lastnostNaziv: el["@_name"],
	// 					lastnostVrednost: el["#text"],
	// 				});
	// 			});
	// 		}
	// 	});
	// 	this.komponenta = lastnosti.map((el) => {
	// 		return {
	// 			KATEGORIJA_kategorija: el.kategorija,
	// 			komponenta: el.lastnostNaziv.replace(":", ""),
	// 		};
	// 	});
	// 	this.atribut = lastnosti.map((el) => {
	// 		return {
	// 			izdelek_ean: el.ean,
	// 			KOMPONENTA_komponenta: el.lastnostNaziv.replace(":", ""),
	// 			atribut: el.lastnostVrednost,
	// 		};
	// 	});
	// }

	splitSlike() {
		let slike = [];
		this.allData.forEach((data) => {
			if (data.dodatne_slike.length) {
				data.dodatne_slike.forEach((el, idx) => {
					if (idx === 0) {
						slike.push({
							izdelek_ean: data.ean,
							slika_url: el["@_link"],
							tip: "mala",
						});
						slike.push({
							izdelek_ean: data.ean,
							slika_url: el["@_link"],
							tip: "velika",
						});
					}
					slike.push({
						izdelek_ean: data.ean,
						slika_url: el["@_link"],
						tip: "dodatna",
					});
				});
			}
		});
		this.slika = slike;
	}

	executeAll() {
		this.createDataObject();
		this.sortCategories();
		this.splitSlike();
		this.splitDodatneLastnosti();
		this.insertDataIntoDb();
	}
}
