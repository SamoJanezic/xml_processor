import DobaviteljController from "./DobaviteljController.js";

export class ColbyController extends DobaviteljController {
	name = "colby";
	nodes = "podjetje.izdelek";
	file = "colby.xml";
	encoding = "utf8";
	keys = [
		"izdelekEAN",
		"izdelekIme",
		"niPodatka",
		"kratkiopis",
		"cena",
		"niPodatka",
		"PPCcena",
		"davcnaStopnja",
		"slikaMala",
		"slikaVelika",
		"dodatneSlike",
		"dodatneLastnosti",
		"blagovnaZnamka",
		"kategorija",
		"niPodatka",
		"zaloga",
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
			"Kabli",
			"Adapterji"
		];
		if (ignoreCategory.includes(param["kategorija"]["#text"])) {
			return true;
		}
	}

	sortCategory() {
    const categoryMap = {
        "Kolesa in skuterji": ["Električna mobilnost"],
        "Potrošni material": ["Pisarniški material"],
        "Podloge": ["Podloge za miške"],
        "Dom in vrt": ["Vse za dom"],
        "Športne ure": ["Ure"],
        "Naprave za pametni dom": ["Pametni dom"],
        "Ohišja": ["Ohišje"],
        "Igre": [
            undefined, "PC", "Outright Games", "PS4", "PS5", "SWITCH", "PM Studios", "XBOXONE", "XONE", "Playstation 4",
            "Xbox One", "Xbox One Series X", "Xbox Series X", "Playstation 5", "Nintendo Switch", "Letalski simulator",
            "XBOXSERIESX", "XBOX", "XBSX", "Xbox One & Xbox Series X", "Xbox Series X & Xbox One", "Nintendo Switch 2", "Nintendo Switch 2 Edition"
        ],
        "Igralni pripomočki": [
            "VR očala in dodatki", "Polnilna postaja", "Stojala", "Dodatki", "Slušalke,Vrsta izdelka", "Polnilna postaja,Vrsta izdelka",
            "Kabli,Vrsta izdelka", "Polnilci,Vrsta izdelka", "Kompleti,Vrsta izdelka", "Playstation dodatki", "Xbox dodatki,Vrsta izdelka",
            "Playstation dodatki,Vrsta izdelka", "Joy-Con,Vrsta izdelka", "Nintendo dodatki", "Igralni ploščki,Vrsta izdelka",
            "Gaming dodatki", "Nintendo dodatki,Vrsta izdelka", "Evercade", "Igralni ploščki", "Volani", "Igralni ploščki,,Vrsta izdelka",
            "Xbox dodatki", "EVERCADE", "Igralne palice in ploščki"
        ],
        "Droni in dodatki": ["Droni"],
        "Slušalke": ["Stojala za slušalke"],
        "Gaming stoli": ["Dodatki za gaming stole"]
    };

    // Build flat map
    const flatCategoryMap = {};
    for (const [newCategory, oldCategories] of Object.entries(categoryMap)) {
        oldCategories.forEach(old => {
            flatCategoryMap[old] = newCategory;
        });
    }

    this.allData.forEach((el) => {
        if (flatCategoryMap[el.kategorija]) {
            el.kategorija = flatCategoryMap[el.kategorija];
        }
    });
}

	formatZaloga(zaloga) {
		return zaloga > 0 ? "Na zalogi" : "Ni na zalogi";
	}

	splitSlike() {
		let slike = [];
		this.allData.forEach((data) => {
			// console.log(data.dodatne_slike)
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

	cleanOpis() {
		this.allData.forEach((el) => {
			if (el["opis"] !== null) {
				el["opis"] = el["opis"].replace(/(<([^>]+)>)/gi, "");
			}
		});
	}

	parseObject(obj) {
		if (obj.dodatna_slika) {
			return obj
		} else {
			return obj ['#text'];
		}
	}

	getEprel() {
		return null;
	}

	executeAll() {
		this.createDataObject();
		// this.cleanOpis();
		// this.addKratki_opis();
		// this.splitSlike();
		this.sortCategory();
		this.insertDataIntoDb();
	}
}
