import dobaviteljController from "./dobaviteljController.js";

export class elkotexController extends dobaviteljController {
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
