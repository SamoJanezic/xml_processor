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


	addKratki_opis() {
		this.allData.forEach(el => {
			if(el["opis"] !== null) {
				el["kratki_opis"] = el["opis"].substring(0, 100).replace(/(<([^>]+)>)/gi, "") + '...';
			}
		});
	}

	exceptions() {

	}

	executeAll() {
		this.createObj();
		this.addKratki_opis();
		this.insertDataIntoDb();
	}
}