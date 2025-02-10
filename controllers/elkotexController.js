import dobaviteljController from "./dobaviteljController.js";

export class elkotexController extends dobaviteljController {
	name = "elkotex";
	nodes = "json.items.item";
	file = "elkotex.xml";
	keys = [
		"ident",
		"ean",
		"naziv",
		"niPodatka",
		"opis",
		"price",
		"niPodatka",
		"mpc",
		"davek",
		"niPodatka",
		"slike",
		"niPodatka",
		"znamkaId",
		"podkategorijaNaziv",
		"niPodatka",
		"dobavitelj",
	];

	exceptions(param) {
		const ignoreCategory = [
			"Uncategorized",
			"Oprema za kopalnice",
			"Medicinski pripomočki",
			"Obnovljeni računalniki",
			"Bazeni, dodatki za bazene",
			"LED sijalke, žarnice",
			"LED luči",
			"Električno orodje",
			"Pisarniški stoli",
			"Balkonske sončne elektrarne",
			"Pisarniško pohištvo",
			"Robustni telefoni",
			"Ostali izdelki",
			"Odstranjevalci vlaken",
			"Video adapterji",
			"Ohišja za diske",
			'Vrtno pohištvo in dodatki',
			'LED trakovi'


		];
		if (param["podkategorijaNaziv"].includes("Rezervni deli")) {
			return true;
		}
		if (ignoreCategory.includes(param["podkategorijaNaziv"])) {
			return true;
		}
	}

	sortCategory() {
		this.allData.forEach((el) => {
			switch (el.kategorija) {
				case 'Microsoft Windows':
				case 'Microsoft Office':
					el.kategorija = "Programska oprema";
				case 'Home Plug PowerLine':
					el.kategorija = "Powerline";
					break;
				case 'NAS naprave':
					el.kategorija = "NAS sistemi";
					break;
				case "Hladilniki za procesorje":
					el.kategorija = 'Hlajenje';
					break;
				case 'Mlinčki za kavo':
				case 'Kavni aparati':
					el.kategorija = "Priprava kave in čaja";
					break;
				case 'Zunanji diski':
				case 'Zunanji SSD diski':
					el.kategorija = "Trdi diski";
				case "Ostali izdelki":
					console.log(el);
					break;
				case 'Tonerji in črnila':
					el.kategorija = "Potrošni material";
					break;
				case "Spominske kartice":
				case "Čitalniki kartic in zaščitne škatlice":
					el.kategorija = "Spominske kartice in čitalci";
					break;
				case "SSD diski":
					el.kategorija = "Trdi diski";
					break;
				case "Pomnilniški moduli":
					el.kategorija = "Pomnilniki";
					break;
				case "Opekači kruha, toasterji":
					el.kategorija = "Opekači kruha";
					break;
				case "Priprava sladoleda in ledomati":
					el.kategorija = "Ledomat";
					break;
				case "Kuhinjske tehtnice":
					el.kategorija = "Tehtnice";
					break;
				case "Salamoreznice/mletje mesa":
					el.kategorija = "Mesoreznice in salamoreznice";
					break;
				case "Blenderji, mešalniki":
					el.kategorija = "Mešalniki";
					break;
				case "Posode za živila":
				case 'Kuhinjska posoda':
				case 'Posodice za vodo':
					el.kategorija = "Posoda";
					break;
				case "Penilniki mleka":
					el.kategorija = "Mešalniki";
					break;
				case "Električne pečice, žari in grelne ploskve":
					el.kategorija = "Kuhinjski žari";
					break;
				case "Stojala za perilo in obešalniki":
					el.kategorija = "Dom in vrt";
					break;
				case "Radio/Gramofoni":
					el.kategorija = "Radio in budilke";
					break;
				case 'Kamp svetilke in komarniki':
				case "Kamp paviljoni, šotori, senčniki":
				case "Kamp pohištvo":
				case "Kamp žari":
				case "Kamp ležalniki in stoli":
				case "Kamp kuhinjski pripomočki":
					el.kategorija = "Kampiranje";
					break;
				case 'Pametne sijalke':
				case 'Robotski sesalniki':
				case 'Robotske kosilnice':
				case "Pametni dom":
					el.kategorija = "Naprave za pametni dom";
					break;
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

	executeAll() {
		this.createDataObject();
		this.sortCategory();
		// this.insertDataIntoDb();
	}
}
