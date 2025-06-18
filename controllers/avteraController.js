import dobaviteljController from "./dobaviteljController.js";
import { AvteraAttributes } from "./attriburteControllers/AvteraAttributes.js";

export class avteraController extends dobaviteljController {
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
			"Grafične kartice"
		];
		if (param["EAN"] === "" || param["EAN"].toString().length < 5) {
			return true;
		}
		if (ignoreCategory.includes(param["kategorija"]["#text"])) {
			return true;
		}
	};

	sortCategories() {
		let count = 0;
		this.allData.forEach((el) => {
			switch (el.kategorija) {
				case "LED hotelski televizorji":
					el.kategorija = 'Televizije';
					break;
				case "Hišni Kino":
					el.kategorija = "Domači kino";
					break;
				case "Elektronski bralniki in dodatki":
					el.kategorija = "Tablični računalniki";
					break;
				case "Hladilne skrinje":
					el.kategorija = "Zamrzovalniki";
					break;
				case "LED TV":
				case "LED prikazovalniki":
					el.kategorija = "Televizije";
					break;
				case "Čitalci kartic":
				case "Spominske kartice":
					el.kategorija = "Spominske kartice in čitalci";
					break;
				case "LCD monitorji":
					el.kategorija = "Monitorji";
					break;
				case "Mrežna oprema":
				case "Mrežna oprema-brezžična":
					el.kategorija = "Usmerjevalniki, stikala in AP";
					break;
				case "Bobni":
					el.kategorija = "Potrošni material";
					break;
				case 'Dodatki Foto/Video':
					el.kategorija = "Dodatki za fotoaparate";
					break;
				case "'Dodatki za tiskalnike":
					el.kategorija = "Tiskalniki";
					break;
				case "POS sistemi":
				case "Dodatki za kopirne stroje":
					el.kategorija = "POS in dodatki";
					break;
				case "Dodatki za računalnike":
				case "Torbice in ovitki za tablice":
				case "Dodatki za tablice":
					el.kategorija = "Dodatki za prenosnike";
					break;
				case "Čitalniki":
					el.kategorija = "Optični bralniki";
					break;
				case "Tiskalniški strežniki":
					el.kategorija = "Strežniki";
					break;
				case "Multifunkcijske naprave":
					el.kategorija = "Tiskalniki";
					break;
				case "Optični pogoni":
					el.kategorija = "Optične enote";
					break;
				case "SSD":
					el.kategorija = "Trdi diski";
					break;
				case "Digitalni fotoaparati":
					el.kategorija = "Fotoaparati";
					break;
				case "Avdio":
					el.kategorija = "Zvok in slika";
					break;
				case "DSP programska oprema":
				case "FPP za podjetja in domačo up.":
					el.kategorija = "Programska oprema";
					break;
				case "Komunikacijske rešitve":
				case "Avdio konferenčni sistemi":
				case "Video konferenčni sistemi":
					el.kategorija = "Konferenčna oprema";
					break;
				case "Consumer AIO":
				case "Računalniki - All in One":
					el.kategorija = "All in one";
					break;
				case "Plinske kuhane plošče":
				case "Električne kuhalne plošče":
					el.kategorija = "Kuhališča";
					break;
				case "Električne pečice":
					el.kategorija = "Pečice";
					break;
				case 'Consumer zmogljivi (Envy, Spectre, Omnibook)':
				case 'Consumer gaming (Omen, Victus)':
  				case 'Consumer osnovni (Laptop, Pavilion, X360)':
				case "Prenosniki - poslovni":
				case "Prenosniki - zmogljivi":
				case "Prenosniki - gaming":
				case "Prenosniki - delovne postaje":
				case "Prenosniki - osnovni":
				case "Prenosniki - hibridni 2 v 1":
					el.kategorija = "Prenosniki";
					break;
				case "Elektični skuterji":
				case "Dodatki za skiroje":
				case "Električna kolesa":
				case 'Tekalna steza':
				case 'Veslaška naprava':
					el.kategorija = "Šport in prosti čas";
					break;
				case "Računalniki - zmogljivi":
				case "Računalniki - delovne postaje":
				case "Računalniki - poslovni":
					el.kategorija = "Namizni računalniki";
					break;
				case "Mestne čelade":
					el.kategorija = "Čelade";
					break;
				case "Nosljive naprave":
					el.kategorija = "Športne ure";
					break;
				case "Električna ogrevala":
					el.kategorija = "Hlajenje in gretje";
					break;
			}
		});
	};

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
		if(obj.lastnost) {
			return obj;
		}
	};

	splitDodatneLastnosti() {
		let lastnosti = [];

		this.allData.forEach(data => {
			lastnosti.push({ean: data.ean, kategorija: data.kategorija, lastnostNaziv: 'Proizvajalec', lastnostVrednost: data.blagovna_znamka});
			const Attributes = new AvteraAttributes(data.kategorija, data.dodatne_lastnosti);
			let attrs = Attributes.formatAttributes()
			if (attrs !== null && Object.keys(attrs).length !== 0) {
				for (const el in attrs) {
					lastnosti.push({ean: data.ean, kategorija: data.kategorija, lastnostNaziv: el, lastnostVrednost: attrs[el]});
				}
			}
			this.komponenta = lastnosti.map(el => { return {KATEGORIJA_kategorija: el.kategorija, komponenta: el.lastnostNaziv}});
			this.atribut = lastnosti.map(el => { return {izdelek_ean: el.ean, KOMPONENTA_komponenta:el.lastnostNaziv, atribut: el.lastnostVrednost}});
		});
	};

	splitSlike() {
		let slike = [];
		this.allData.forEach((data) => {
			if(data.slika_velika) {
				slike.push({
					izdelek_ean: data.ean,
					slika_url: data.slika_velika,
					tip:'velika',
				});
			}
			if(data.dodatne_slike) {
				data.dodatne_slike.forEach(el => {
					slike.push({
						izdelek_ean: data.ean,
						slika_url: el,
						tip: 'dodatna',
					});
				});
			}
		});
		this.slika = slike;
	}

	getEprel(key) {

	}

	executeAll() {
		this.createDataObject();
		this.sortCategories();
		this.addKratki_opis();
		this.splitSlike();
		this.splitDodatneLastnosti();
		this.insertDataIntoDb();
	};
};
