import izdelkiController from "./izdelkiController.js";

export class avteraController extends izdelkiController {
	name = "eventus";
	nodes = "json.podjetje.izdelki.izdelek";
	file = "eventus.xml";
	keys = [
		"izdelekID",
		"EAN",
		"izdelekIme",
		"kratek_opis",
		"opis",
		"nabavnaCena",
		"DC",
		"PPC",
		"davcnaStopnja",
		"dodatneSlijke",
		"slikaVelika",
		"dodatneLastnosti",
		"blagovnaZnamka",
		"kategorija",
		"niPodatka",
		"dobavitelj",
	];
}
