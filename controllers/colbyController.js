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

	exceptions() {
		
	}

	cleanOpis() {
		this.allData.forEach((el) => {
			if(el["opis"] !== null) {
				el["opis"] = el["opis"].replace(/(<([^>]+)>)/gi, "");
			}
		});
	}

	executeAll() {
		this.createDataObject();
		this.cleanOpis();
		this.addKratki_opis();
		this.insertDataIntoDb();
	}
}
