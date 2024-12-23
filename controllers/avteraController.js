import dobaviteljController from "./dobaviteljController.js";

export class avteraController extends dobaviteljController {
	name = "avtera";
	nodes = "json.podjetje.izdelki.izdelek";
	file = "avtera.xml";
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
		"dodatneSlike",
		"slikaVelika",
		"dodatneLastnosti",
		"blagovnaZnamka",
		"kategorija",
		"EprelID",
		"dobavitelj",
	];

	exceptions(param) {
		if (param["kategorija"]["#text"] === "Rezervni deli") {
			return true;
		}
	}

	executeAll() {
		this.createObj();
		this.addKratki_opis();
		this.insertDataIntoDb();
	}
}
