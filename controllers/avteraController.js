import DobaviteljController from "./DobaviteljController.js";

export class AvteraController extends DobaviteljController {
	constructor(categoryMap, Attributes, ...args) {
		super(...args);
		this.categoryMap = categoryMap;
		this.Attributes = Attributes;
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

	ignoreCategorySet = new Set([
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
		"Dodatki za fotoaparate",
		"Dodatki za tiskalnike",
		"Domači kino",
		"Fotoaparati",
		"Tiskalniški strežniki",
		"Grafične kartice",
		"Zobne ščetke in prhe",
		"Sprehajalne steze",
		"Igralni pripomočki",
	]);

	exceptions(param) {
		if (param["EAN"] === "" || param["EAN"].toString().length < 5) {
			return true;
		}
		if (this.ignoreCategorySet.has(param["kategorija"]["#text"])) {
			return true;
		}
	}

	flattenCategoryMap(categoryMap) {
		return Object.entries(categoryMap).reduce((acc, [newCategory, oldCategories]) => {
			oldCategories.forEach(old => acc[old] = newCategory);
			return acc;
		}, {});
	}

	processCategory(data, flatCategoryMap) {
		let kategorija = data.kategorija;
		let dodatne_lastnosti = data.dodatne_lastnosti
			? JSON.parse(JSON.stringify(data.dodatne_lastnosti))
			: [];

		const newCat = flatCategoryMap[kategorija];
		if (newCat) {
			kategorija = newCat;
		}

		return { ...data, kategorija, dodatne_lastnosti };
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

	processLastnosti(data) {
		let lastnosti = [
			{
				ean: data.ean,
				kategorija: data.kategorija,
				lastnostNaziv: "Proizvajalec",
				lastnostVrednost: data.blagovna_znamka
			}
		];

		const attrs = new this.Attributes(data.kategorija, data.dodatne_lastnosti.lastnost)
			.formatAttributes();

		if (attrs && Object.keys(attrs).length) {
			lastnosti.push(...Object.entries(attrs).map(([naziv, vrednost]) => ({
				ean: data.ean,
				kategorija: data.kategorija,
				lastnostNaziv: naziv,
				lastnostVrednost: vrednost
			})));
		}

		return lastnosti;
	}

	processImages(data) {
		const slike = [
			{ izdelek_ean: data.ean, slika_url: data.slika_mala, tip: "mala" },
			{ izdelek_ean: data.ean, slika_url: data.slika_velika, tip: "velika" }
		];

		if (data.dodatne_slike?.[0]) {
			const dodatneSlike = Array.isArray(data.dodatne_slike[0])
				? data.dodatne_slike[0]
				: data.dodatne_slike;

			slike.push(...dodatneSlike.map(el => ({
				izdelek_ean: data.ean,
				slika_url: el,
				tip: "dodatna"
			})));
		}

		return slike;
	}

	mapKomponentaAndAtribut(lastnosti) {
        const komponenta = [];
        const atribut = [];
        for (const el of lastnosti) {
            komponenta.push({
                KATEGORIJA_kategorija: el.kategorija,
                komponenta: el.lastnostNaziv
            });
            atribut.push({
                izdelek_ean: el.ean,
                KOMPONENTA_komponenta: el.lastnostNaziv,
                atribut: el.lastnostVrednost
            });
        }
        return { komponenta, atribut };
    }

	processAllData() {
		const flatCategoryMap = this.flattenCategoryMap(this.categoryMap);

		const { slike, lastnosti } = this.allData.reduce(
			(acc, rawData) => {
				const updated = this.processCategory(rawData, flatCategoryMap);
				rawData.kategorija = updated.kategorija
				rawData.kratki_opis = rawData.opis ? rawData.opis.substring(0, 100) : null;
				acc.slike.push(...this.processImages(updated));
				acc.lastnosti.push(...this.processLastnosti(updated));
				return acc;
			},
			{ slike: [], lastnosti: [] }
		);

		const { komponenta, atribut } = this.mapKomponentaAndAtribut(lastnosti);

		Object.assign(this, {
            slika: slike,
            komponenta,
            atribut,
        });
	}

	getEprel(key) {}

	executeAll() {
		this.createDataObject();
		this.processAllData();
		this.insertDataIntoDb();
	}
}
