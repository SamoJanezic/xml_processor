import dobaviteljController from "./dobaviteljController.js";

export class eventusController extends dobaviteljController {
	name = "eventus";
	nodes = "podjetje.izdelki.izdelek";
	file = "eventus.xml";
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
		];
		if (ignoreCategory.includes(param["kategorija"]["#text"])) {
			return true;
		}
		// if (param["kategorija"]["#text"] === "Rezervni deli") {
		// 	return true;
		// }
	}

	sortCategory() {
		this.allData.forEach((el) => {
			switch (el.kategorija) {
				case "Stoli":
					el.kategorija = "Gaming stoli";
					break;
				case "Torbe in nahrbtniki":
					el.kategorija = "Dodatki za prenosnike";
					break;
				case "Športna elektronika":
					el.kategorija = "Športne ure";
					break;
				case "Prenapetostna zaščita":
					el.kategorija = "UPS";
					break;
				case "Prenosni monitorji":
					el.kategorija = "Monitorji";
					break;
				case "Zasebni strežniki":
					el.kategorija = "Strežniki";
					break;
				case "Ključki, kartice, čitalci":
				case "Spominske kartice":
					el.kategorija = "Spominske kartice in čitalci";
					break;
				case "Kabli":
				case "Adapterji":
					el.kategorija = "Kabli in adapterji";
					break;
				case "Antivirus":
					el.kategorija = "Programska oprema";
					break;
				case "Dodatki za SSD/HDD":
				case "Diski SSD":
					el.kategorija = "Trdi diski";
					break;
				case "E-bralniki":
				case "Oprema za tablice":
					el.kategorija = "Tablični računalniki";
					break;
				case "Računalniška ohišja":
					el.kategorija = "Ohišja";
					break;
				case "Monitorji in projektorji":
					el.kategorija = "Monitorji";
					break;
				case "Prenosniki in dodatki":
					el.kategorija = "Prenosniki";
					break;
				case "Podloge za miške":
					el.kategorija = "Podloge";
					break;
				case "Stojala in nosilci":
					el.kategorija = "Nosilci za TV";
					break;
				case "Slušalke in mikrofoni":
					el.kategorija = "Slušalke";
					break;
				case "Bitcoin in kripto varnost":
					el.kategorija = "Kripto svet";
					break;
				case "USB hubi":
				case "Adapterji in USB naprave":
				case "Priključne postaje":
					el.kategorija = "Mediji";
					break;
				case "RAM pomnilniki":
					el.kategorija = "Pomnilniki";
					break;
				case "Gaming in streaming":
					el.kategorija = "Gaming";
					break;
				case "Kolesarski računalniki":
				case "Kolesarstvo":
				case "Kolesarske luči":
					el.kategorija = "Kolesa in skuterji";
					break;
				case "Ventilatorji in AIO hladilniki":
				case "Ohišja in hlajenje":
					el.kategorija = "Hlajenje";
					break;
				case "Gramofoni":
					el.kategorija = "HI-FI in Prenosni zvočniki";
					break;
				case "UPS naprave":
					el.kategorija = "UPS";
					break;
				case "Grafične tablice in dodatki":
				case "Grafični zasloni":
					el.kategorija = "POS in dodatki";
					break;
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
			if (data.dodatne_lastnosti && data.dodatne_lastnosti.lastnost) {
				if (!data.dodatne_lastnosti.lastnost.length) {
					lastnosti.push({
						ean: data.ean,
						kategorija: data.kategorija,
						lastnostNaziv: data["@_naziv"],
						lastnostVrednost: data["#text"],
					});
				} else {
					data.dodatne_lastnosti.lastnost.forEach((el, idx) => {
						if (el["@_naziv"] === "EPREL Id") {
							this.allData[idx]["eprel_id"] = el["#text"];
							// console.log(this.allData.eprel_id);
						}
						lastnosti.push({
							ean: data.ean,
							kategorija: data.kategorija,
							lastnostNaziv: el["@_naziv"],
							lastnostVrednost: el["#text"],
						});
					});
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
