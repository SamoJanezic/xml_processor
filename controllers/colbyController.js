import dobaviteljController from "./dobaviteljController.js";

export class colbyController extends dobaviteljController {
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
