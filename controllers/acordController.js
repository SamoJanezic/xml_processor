import dobaviteljController from "./dobaviteljController.js";

export class acordController extends dobaviteljController {
	name = "acord";
	nodes = "json.podjetje.izdelki.izdelek";
	file = "acord.xml";
	encoding = "utf8";
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
		"slikaMala",
		"slikaVelika",
		"dodatneSlike",
		"dodatneLastnosti",
		"blagovnaZnamka",
		"kategorija",
		"eprel",
		"dobavitelj",
		"dobava",
	];

	exceptions(param) {
		const ignoreCategory = [
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
		this.allData.forEach((el) => {
			switch (el.kategorija) {
				case "Avdio/Video":
					el.kategorija = "Zvok in slika";
					break;
				case "UPS napajanja, inverterji, regulatorji napetosti":
					el.kategorija = "UPS";
					break;
				case "Igračarski pripomočki":
					el.kategorija = "Igralni pripomočki";
					break;
				case "Mrežne kartice in adapterji":
				case "WiFi ojačevalci - extender":
				case "Antene":
					el.kategorija = "Mrežne kartice, antene, WIFI ojačevalci";
					break;
				case "Centralne enote":
				case "Stikala - switch":
				case "Usmerjevalniki - router":
				case "Dostopne točke - AP":
					el.kategorija = "Usmerjevalniki, stikala in AP";
					break;
				case "Razširitvene kartice":
				case "Trdi diski in SSD":
				case "Zunanja ohišja za diske":
				case "Zunanji trdi diski in SSD":
					el.kategorija = "Trdi diski";
					break;
				case "Pisarniški programi":
				case "Operacijski sistemi":
					el.kategorija = "Programska oprema";
					break;
				case "Vgradni - OPS":
				case "Interaktivni - touch":
				case "Računalniški - desktop":
				case "Informacijski - public":
					el.kategorija = "Monitorji";
					break;
				case "Kamere":
					el.kategorija = "Spletne kamere";
					break;
				case "Napajalni adapterji":
				case "Zunanje naprave":
					el.kategorija = "Dodatki za prenosnike";
					break;
				case "Spominske kartice":
					el.kategorija = "Spominske kartice in čitalci";
					break;
				case "Stikala":
				case "Senzorji":
					el.kategorija = "Naprave za pametni dom";
					break;
				case "Čistilci zraka":
					el.kategorija = "Razvlažilci zraka";
					break;
				case "Krmilniki":
					el.kategorija = "Pametni vrtovi";
					break;
				case "Interaktivna oprema":
					el.kategorija = "Konferenčna oprema";
					break;
				case "Namizni - desktop":
				case "Dodatna interaktivna oprema":
					el.kategorija = "Računalniki";
					break;
				case "Prenosni - notebook":
					el.kategorija = "Prenosniki";
					break;
				case "NAS strežniki":
					el.kategorija = "NAS";
					break;
				case "Strežniki- server":
					el.kategorija = "Strežniki";
					break;
				case "Razdelilci in prenapetostna zaščita":
					el.kategorija = "UPS";
					break;
				case "Šport in prosti čas":
					el.kategorija = "Šport in prosti čas";
					break;
				case "IP kamere":
				case "Nadzorne kamere":
					el.kategorija = "Kamere";
					break;
				case "Mini, micro, barebone":
					el.kategorija = "Mini";
					break;
				case "Tablični - tablet":
					el.kategorija = "Tablični računalniki";
					break;
				case "Gaming":
					el.kategorija = "Gaming stoli";
					break;
				case "All-in-one - AIO":
					el.kategorija = "AIO";
					break;
				case "Hubi, čitalci, priklopne postaje":
					el.kategorija = "Spominske kartice in čitalci";
					break;
				case "Igričarski pripomočki":
					el.kategorija = "Igralni pripomočki";
					break;
				case "Gaming miške in podloge":
					el.kategorija = "Podloge";
					break;
				case "Čitalniki črtnih kod":
					el.kategorija = "Optični bralniki";
					break;
				case "Dodatna oprema za omare":
					el.kategorija = "POS in dodatki";
					break;
			}
		});
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
		const ignore = [
			"EAN koda:",
			"EAN koda",
			"Proizvajalčeva koda",
			" ",
			"/",
		];
		let lastnosti = [];
		this.allData.forEach((data) => {
			data.dodatne_lastnosti.lastnost.forEach((el) => {
				if (
					ignore.includes(el["@_naziv"]) ||
					ignore.includes(el["#text"])
				) {
					return;
				}
				lastnosti.push({
					ean: data.ean,
					kategorija: data.kategorija,
					lastnostNaziv: el["@_naziv"],
					lastnostVrednost: el["#text"],
				});
			});
		});
		this.komponenta = lastnosti.map((el) => {
			return {
				KATEGORIJA_kategorija: el.kategorija,
				komponenta: el.lastnostNaziv.replace(":", ""),
			};
		});
		this.atribut = lastnosti.map((el) => {
			return {
				izdelek_ean: el.ean,
				KOMPONENTA_komponenta: el.lastnostNaziv.replace(":", ""),
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
