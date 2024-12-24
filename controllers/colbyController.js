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

	executeAll() {
		this.createObj();
		this.addKratki_opis();
		this.insertDataIntoDb();
	}
}
