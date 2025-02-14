import dobaviteljController from "./dobaviteljController.js";

export class avteraController extends dobaviteljController {
	name = "avtera";
	nodes = "json.podjetje.izdelki.izdelek";
	file = "avtera.xml";
	encoding = "windows1250";
	keys = [
		"izdelekID",
		"EAN",
		"izdelekIme",
		"niPodatka",
		"opis",
		"nabavnaCena",
		"DC",
		"PPC",
		"davcnaStopnja",
		"dodatneSlike",
		"slikaVelika",
		"dodatneLastnosti",
		"blagovnaZnamka",
		"kategorija",
		"EprelID",
		"dobavitelj",
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
				case "Hišni Kino":
					el.kategorija = "Domači kino";
				case "Dodatki za tablice":
				case "Elektronski bralniki in dodatki":
				case "Torbice in ovitki za tablice":
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
					el.kategorija = "Monitorji"
				case "Mrežna oprema":
					el.kategorija = "Mrežne kartice, antene, WIFI ojačevalci";
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
					el.kategorija = "Trdi diski"
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
				case "Računalniki - All in One":
					el.kategorija = "AIO";
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

	keyRules(obj, product, key, idx, vrstica) {
		if (key === "dobavitelj") {
			obj[vrstica[idx]] = this.name;
		} else if (key === "niPodatka" || product[key] === "") {
			obj[vrstica[idx]] = null;
		} else if (typeof product[key] === "object") {
			obj[vrstica[idx]] = this.parseObject(product[key]);
		} else {
			obj[vrstica[idx]] = product[key];
		}
		return obj;
	}


	executeAll() {
		this.createDataObject();
		this.addKratki_opis();
		this.sortCategories();
		this.insertDataIntoDb();
	};
};
