import dobaviteljController from "./dobaviteljController.js";

export class eventusController extends dobaviteljController {
	name = "eventus";
	nodes = "json.podjetje.izdelki.izdelek";
	file = "eventus.xml";
	keys = [
		"izdelekID",
		"EAN",
		"izdelekIme",
		"kratek_opis",
		"opis",
		"nabavnaCena",
		"DC",
		"PPC",
		"davcnaStopnja",
		"dodatneSlijke",
		"slikaVelika",
		"dodatneLastnosti",
		"blagovnaZnamka",
		"kategorija",
		"niPodatka",
		"dobavitelj",
	];

	exceptions(param) {
		const ignoreCategory = [
			'Odprodaja %',
			'LED osvetlitev',
			"Rezervni deli",
			'GLS',
			'Polnilne baterije in postaje',
			'Varnostni dodatki',
			'Stojala',
			'Polnilne baterije',
			'Oprema za telefone in ure',
			'Polnilci',
			'Zvočne kartice',
			'Pisala, stojala in dodatki',
			'Čistila za tehniko',
			'Strojne denarnice'
		]
		if (ignoreCategory.includes(param["kategorija"]["#text"])) {
			return true;
		}
		// if (param["kategorija"]["#text"] === "Rezervni deli") {
		// 	return true;
		// }
	};

	sortCategory() {
		this.allData.forEach((el) => {
			switch (el.kategorija) {
				case 'Stoli':
					el.kategorija = "Gaming stoli";
					break;
				case 'Torbe in nahrbtniki':
					el.kategorija = "Dodatki za prenosnike";
					break;
				case 'Športna elektronika':
					el.kategorija = "Športne ure";
					break;
				case 'Prenapetostna zaščita':
					el.kategorija = "UPS";
					break;
				case 'Prenosni monitorji':
					el.kategorija = "Monitorji";
					break;
				case 'Zasebni strežniki':
					el.kategorija = 'Strežniki';
					break;
				case 'Ključki, kartice, čitalci':
				case 'Spominske kartice':
					el.kategorija = "Spominske kartice in čitalci";
					break;
				case 'Kabli':
				case 'Adapterji':
					el.kategorija = "Kabli in adapterji";
					break;
				case "Antivirus":
					el.kategorija = "Programska oprema";
					break;
				case 'Dodatki za SSD/HDD':
				case "Diski SSD":
					el.kategorija = "Trdi diski";
					break;
				case "E-bralniki":
				case 'Oprema za tablice':
					el.kategorija = "Tablični računalniki";
					break;
				case 'Računalniška ohišja':
					el.kategorija = "Ohišja";
					break;
				case 'Monitorji in projektorji':
					el.kategorija = "Monitorji";
					break;
				case 'Prenosniki in dodatki':
					el.kategorija = "Prenosniki";
					break;
				case 'Podloge za miške':
					el.kategorija = "Podloge";
					break;
				case 'Stojala in nosilci':
					el.kategorija = "Nosilci za TV";
					break;
				case 'Slušalke in mikrofoni':
					el.kategorija = "Slušalke";
					break;
				case 'Bitcoin in kripto varnost':
					el.kategorija = "Kripto svet";
					break;
				case 'USB hubi':
				case 'Adapterji in USB naprave':
				case 'Priključne postaje':
					el.kategorija = "Mediji";
					break;
				case 'RAM pomnilniki':
					el.kategorija = "Pomnilniki";
					break;
				case 'Gaming in streaming':
					el.kategorija = 'Gaming';
					break;
				case 'Kolesarski računalniki':
				case 'Kolesarstvo':
				case 'Kolesarske luči':
					el.kategorija = "Kolesa in skuterji";
					break;
				case 'Ventilatorji in AIO hladilniki':
				case 'Ohišja in hlajenje':
					el.kategorija = "Hlajenje";
					break;
				case 'Gramofoni':
					el.kategorija = "HI-FI in Prenosni zvočniki";
					break;
				case 'UPS naprave':
					el.kategorija = "UPS";
					break;
				case 'Grafične tablice in dodatki':
				case 'Grafični zasloni':
					el.kategorija = 'POS in dodatki';
					break;
			}
		})
	};

	parseObject(obj) {
		let str = "";
		if (obj.dodatnaSlika1) {
			return obj.dodatnaSlika1;
		}
		if (!obj.hasOwnProperty("lastnost")) {
			return obj["#text"];
		}
		if (obj.lastnost) {
			return obj
		}
		return str;
	};

	splitDodatneLastnosti() {
		let lastnosti = [];

		this.allData.forEach(data => {
			if (data.dodatne_lastnosti && data.dodatne_lastnosti.lastnost) {
				if(!data.dodatne_lastnosti.lastnost.length) {
					lastnosti.push({ean: data.ean, kategorija: data.kategorija, lastnostNaziv: data['@_naziv'], lastnostVrednost: data['#text']})
				} else {
					data.dodatne_lastnosti.lastnost.forEach(el => {
					if(el['@_naziv'] === "EAN koda" || el['@_naziv'] === "Proizvajalčeva koda" || el['#text'] === ' ' || el['#text'] === '/') {
						return;
						}
						lastnosti.push({ean: data.ean, kategorija: data.kategorija, lastnostNaziv: el['@_naziv'], lastnostVrednost: el['#text']})
					})
				}
			}
		});
		this.komponenta = lastnosti.map(el => { return {KATEGORIJA_kategorija: el.kategorija, komponenta: el.lastnostNaziv}});
		this.atribut = lastnosti.map(el => { return {KOMPONENTA_komponenta:el.lastnostNaziv, atribut: el.lastnostVrednost}});
	}

	getEprel() {
		return null;
	};

	executeAll() {
		this.createDataObject();
		this.sortCategory();
		this.splitDodatneLastnosti();
		this.insertDataIntoDb();
	}
}
