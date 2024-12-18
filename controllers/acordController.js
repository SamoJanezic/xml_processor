import dobaviteljController from "./dobaviteljController.js";

export class acordController extends dobaviteljController {
	name = "acord";
	nodes = "json.podjetje.izdelki.izdelek";
	file = "acord.xml";
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
	allData = [

	];

	addKratki_opis() {
		this.allData.forEach(el => {
			el["kratki_opis"] = el["opis"].substring(3, 50) + '...';
		})
	}



}


				// if (key === "dobavitelj") {
				// 	return this.name;
				// }
				// if (key === "niPodatka") {
				// 	return null;
				// }
				// if (product[key] === "") {
				// 	return null;
				// }
				// if (product[key] === undefined) {
				// 	return null;
				// }
				// if (product[key].constructor === Object) {
				// 	return Object.values(product[key])[0];
				// }
				// return product[key];