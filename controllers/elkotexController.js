import izdelkiController from "./izdelkiController.js";

export class avteraController extends izdelkiController {
	name = "elkotex";
	nodes = "json.items.item";
	file = "elkotex.xml";
	keys = [
		"ident",
		"ean",
		"naziv",
		"niPodatka",
		"opis",
		"price",
		"niPodatka",
		"mpc",
		"davek",
		"niPodatka",
		"slike",
		"niPodatka",
		"znamkaId",
		"podkategorijaNaziv",
		"niPodatka",
		"dobavitelj",
	];
}