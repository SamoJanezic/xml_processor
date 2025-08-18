import DobaviteljController from "./DobaviteljController.js";

export class EventusController extends DobaviteljController {
	constructor(categoryMap, Attributes, ...args) {
		super(...args);
		this.categoryMap = categoryMap;
		this.Attributes = Attributes;
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

	ignoreCategorySet = new Set([
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
	]);

	exceptions(param) {
		if (this.ignoreCategorySet.has(param["kategorija"]["#text"])) {
			return true;
		}
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

	flattenCategoryMap(categoryMap) {
		return Object.entries(categoryMap).reduce((acc, [newCategory, oldCategories]) => {
			oldCategories.forEach(old => acc[old] = newCategory);
			return acc;
		}, {});
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
				acc.slike.push(...this.processImages(updated));
				acc.lastnosti.push(...this.processLastnosti(updated));
				return acc;
			},
			{ slike: [], lastnosti: [], newAllData: [] }
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
