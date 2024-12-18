import izdelkiController from "./izdelkiController.js";

export class avteraController extends izdelkiController {
	name = "avtera";
	nodes = "json.podjetje.izdelki.izdelek";
	file = "avtera.xml";
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
		"dobavitelj"
	];
}
