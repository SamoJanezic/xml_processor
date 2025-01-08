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
		"dodatneLastnosti",
		"blagovnaZnamka",
		"kategorija",
		"niPodatka",
		"dobavitelj",
	];

	exceptions(param) {
		if (param["EAN"] === '' || param["EAN"].toString().length < 5) {
			return true;
		}
	}

	executeAll() {
		this.createDataObject();
		this.addKratki_opis();
		this.insertDataIntoDb();
	}
}