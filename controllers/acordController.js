import DobaviteljController from "./DobaviteljController.js";

export class AcordController extends DobaviteljController {
	constructor(categoryMap, Attributes, ...args) {
		super(...args);
		this.categoryMap = categoryMap;
		this.Attributes = Attributes;
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

	ignoreCategorySet = new Set([
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
		"LED trakovi",
		"Razdelilci in podaljški",
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
		"Powerbank baterije"
	]);

	exceptions(param) {
		if (
			param["EAN"] === "" ||
			param["EAN"].toString().length < 5 ||
			param["EAN"].toString().includes(" ")
		) {
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

	getEprel(key) {
		return key ? key.match(/[0-9]+/g)?.[0] ?? null : null;
	}

	executeAll() {
		this.createDataObject();
		this.processAllData();
		this.addKratki_opis();
		this.insertDataIntoDb();
	}
}
