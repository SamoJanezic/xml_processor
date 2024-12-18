import izdelkiController from "./izdelkiController.js";

export class avteraController extends izdelkiController {
	name = "colby";
	nodes = "json.podjetje.izdelek";
	file = "colby.xml";
	keys = [
		"produktnakoda",
		"izdelekEAN",
		"izdelekIme",
		"kratkiopis",
		"tehnicniopis",
		"cena",
		"niPodatka",
		"PPCcena",
		"davcnaStopnja",
		"slikaMala",
		"dodatneSlike",
		"dodatneLastnosti",
		"blagovnaZnamka",
		"kategorija",
		"niPodatka",
		"dobavitelj",
	];
}
