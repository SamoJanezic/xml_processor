import dobaviteljController from "./dobaviteljController.js";

export class colbyController extends dobaviteljController {
	name = "colby";
	nodes = "json.podjetje.izdelek";
	file = "colby.xml";
	keys = [
		"produktnakoda",
		"izdelekEAN",
		"izdelekIme",
		"niPodatka",
		"kratkiopis",
		"cena",
		"niPodatka",
		"PPCcena",
		"davcnaStopnja",
		"SlikaSkatla",
		"slikaVelika",
		"dodatneLastnosti",
		"blagovnaZnamka",
		"kategorija",
		"niPodatka",
		"dobavitelj",
	];

	exceptions(param) {
		const ignoreCategory = [
			"Torbice,Vrsta izdelka",
			"Denarnice",
			"Svetila",
			"Obeski",
			"Pokrivala",
			"Kozarci",
			"Maske",
			"Skodelice",
			"Pliš",
			"Oblačila",
			"Replike orožij",
			"Dekoracija",
			"Družabne igre",
			"Nerf",
			"Nalepke",
			"Lifestyle",
			"Priponke",
			"Darilni set",
			"Predpražniki",
			"Zaščitne maske",
			"Potovalne skodelice",
			"Bidoni",
			"Plakati",
			"Barski pripomočki",
			"Karte",
			"Kelihi",
			"Vrči",
			"Prisrčnice",
			"Igrače",
			"glasbila",
			"Ogledala",
			"Zbirateljske figure",
			"Figure,Vrsta izdelka",
			"Figure",
			"Torbice",
			"LEGO",
			"Stabilizatorji",
			"Powerbanki",
			"Drugo",
			"Podstavki",
			"Kuhinjski pripomočki",
		];
		if (ignoreCategory.includes(param["kategorija"]["#text"])) {
			return true;
		}
	}

	sortCategory() {
		this.allData.forEach((el) => {
			switch (el.kategorija) {
				case "Električna mobilnost":
					el.kategorija = "Kolesa in skuterji";
					break;
				case "Pisarniški material":
					el.kategorija = "Potrošni material";
					break;
				case "Podloge za miške":
					el.kategorija = "Podloge";
					break;
				case "Vse za dom":
					el.kategorija = "Dom in vrt";
					break;
				case "Ure":
					el.kategorija = "Športne ure";
					break;
				case "Pametni dom":
					el.kategorija = "Naprave za pametni dom";
					break;
				case "Ohišje":
					el.kategorija = "Ohišja";
					break;
				case "PC":
				case "Outright Games":
				case "PS4":
				case "PS5":
				case "SWITCH":
				case "PM Studios":
				case "XBOXONE":
				case "XONE":
				case "Playstation 4":
				case "Xbox One":
				case "Xbox One Series X":
				case "Xbox Series X":
				case "Playstation 5":
				case "Nintendo Switch":
				case "Letalski simulator":
				case "XBOXSERIESX":
				case "XBOX":
				case "XBSX":
				case "Xbox One & Xbox Series X":
				case "Xbox Series X & Xbox One":
					el.kategorija = "Igre";
					break;
				case "Polnilna postaja":
				case "Stojala":
				case "Dodatki":
				case "Slušalke,Vrsta izdelka":
				case "Polnilna postaja,Vrsta izdelka":
				case "Kabli,Vrsta izdelka":
				case "Polnilci,Vrsta izdelka":
				case "Kompleti,Vrsta izdelka":
				case "Playstation dodatki":
				case "Xbox dodatki,Vrsta izdelka":
				case "Playstation dodatki,Vrsta izdelka":
				case "Joy-Con,Vrsta izdelka":
				case "Nintendo dodatki":
				case "Igralni ploščki,Vrsta izdelka":
				case "Gaming dodatki":
				case "Nintendo dodatki,Vrsta izdelka":
				case "Evercade":
				case "Igralni ploščki":
				case "Volani":
				case "Xbox dodatki":
				case "Igralne palice in ploščki":
					el.kategorija = "Igralni pripomočki";
					break;
				case "Droni":
					el.kategorija = "Droni in dodatki";
					break;
				case "Stojala za slušalke":
					el.kategorija = "Slušalke";
					break;
				case "Dodatki za gaming stole":
					el.kategorija = "Gaming stoli";
					break;
				// case "Polnilna postaja":
				// 	console.log(el)
				// 	// el.kategorija = "Igre";
				// 	break;
			}
		});

		const arr = [];
		this.allData.forEach((el) => {
			if (!arr.includes(el.kategorija)) {
				arr.push(el.kategorija);
			}
		});
		console.table(arr);
	}

	cleanOpis() {
		this.allData.forEach((el) => {
			if (el["opis"] !== null) {
				el["opis"] = el["opis"].replace(/(<([^>]+)>)/gi, "");
			}
		});
	}

	executeAll() {
		this.createDataObject();
		this.cleanOpis();
		this.addKratki_opis();
		this.sortCategory();
		this.insertDataIntoDb();
	}
}
