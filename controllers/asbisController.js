import DobaviteljController from "./DobaviteljController.js";

export class AsbisController extends DobaviteljController {
	constructor(categoryMap, Attributes, ...args) {
		super(...args);
		this.categoryMap = categoryMap;
		this.Attributes = Attributes;
	}
	name = "asbis";
	file = [
		{ fileName: "asbis1.xml", node: "ProductCatalog.Product" },
		{ fileName: "asbis2.xml", node: "CONTENT.PRICES.PRICE" },
	];
	encoding = "utf8";
	keys = [
		"EAN",
		"ProductDescription",
		"niPodatka",
		"MarketingInfo",
		"niPodatka",
		"MY_PRICE",
		"RETAIL_PRICE",
		"niPodatka",
		"SMALL_IMAGE",
		"Image",
		"Images",
		"AttrList",
		"Vendor",
		"ProductType",
		"niPodatka",
		"AVAIL",
	];

	 ignoreCategorySet = new Set([
		"Various Accessories",
		"Wireless Charger",
		"Power Battery Charger",
		"Mounting Hardware",
		"Car Accessories",
		"Pc Mobile Accessories",
		"Avtomobilski video snemalnik",
		"Cables USB",
		"Cable",
		"Power Adapter",
		"Controller Card",
		"Bluetooth Adapter",
		"USB Hub",
		"Multiboard",
		"IDS Totem",
		"Networking - Cables",
		"Žari",
		"Nega las",
		"Čistilci na tlak in metle",
		"Priprava kave in čaja",
		"Pripomočki za osebno nego",
		"IPad Accessories",
		"HDD Cabinet",
		"HDD/SSD Enclosure",
		"Intercom Panel",
		"Antenna",
		"Networking - Accessories",
		"Networking - Cloud Keys & Gateways - Cloud Key Enterprise",
		"Network Management Module",
		"Network Interface Card",
		"Networking - Range Extender",
		"PC Barebone",
		"PC NetTop",
		"Server Desktop",
		"Main Board Server",
		"Acc - Dental care",
		"Ščetke za zobe",
		"Čistilci na tlak in metle",
		"Pripomočki za osebno nego",
		"Networked Storage Device",
		"VC Docks",
		"Smart Tracker",
	]);

	routerTypes = {
		"Networking - Router": "Usmerjevalnik",
		"Networking - Transceiver": "Usmerjevalnik",
		"Networking - Wireless Outdoor Access Point": "Dostopna točka",
		"Networking - Wireless Access Point": "Dostopna točka",
		"Network Switch": "Stikalo"
	};

	exceptions(product) {
		if (this.ignoreCategorySet.has(product.ProductType)) return true;
		if (
			product.EAN.length < 5 ||
			!product.AVAIL ||
			product.AVAIL === "" ||
			product.AVAIL === " "
		) {
			return true;
		}
	}

	combineData() {
		const [opisi, cene] = this.getData();
        return opisi.flatMap(opis =>
            cene
                .filter(cena => opis.ProductCode === cena.WIC)
                .map(cena => ({ ...opis, ...cena }))
        );
		return combinedData;
	}

	parseObject(obj) {
		return obj.element?.length ? obj.element : Object.values(obj);
	}

	formatZaloga(zaloga) {
		return zaloga > 0 ? "Na zalogi" : "Ni na zalogi";
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
			if (newCat === "Usmerjevalniki, stikala in AP" &&
				this.routerTypes[kategorija] &&
				Array.isArray(dodatne_lastnosti)) {
				dodatne_lastnosti.push({
					"@_Name": "Vrsta",
					"@_Value": this.routerTypes[kategorija]
				});
			}
			kategorija = newCat;
		}

		return { ...data, kategorija, dodatne_lastnosti };
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

	processLastnosti(data) {
		let lastnosti = [
			{
				ean: data.ean,
				kategorija: data.kategorija,
				lastnostNaziv: "Proizvajalec",
				lastnostVrednost: data.blagovna_znamka
			}
		];

		const attrs = new this.Attributes(data.kategorija, data.dodatne_lastnosti)
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

	processOpis(opis) {
		return (opis !== null && typeof opis !== "string" && opis[0]?.length)
            ? opis[0]
            : opis;
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
				rawData.opis = this.processOpis(rawData.opis);
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

	executeAll() {
		this.createDataObject();
		this.processAllData();
		this.insertDataIntoDb();
	}
}
