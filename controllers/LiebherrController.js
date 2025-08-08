import dobaviteljController from "./DobaviteljController.js";

export class LiebherrController extends dobaviteljController {
	name = "liebherr";
	nodes = "Export.LeaveNode.LeaveNode";
	file = "liebherr.xml";
	encoding = "utf8";
	keys = [
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
		"dodatneSlike",
		"dodatneLastnosti",
		"blagovnaZnamka",
	];

	exceptions(param) {
		const ignoreCategory = []
	}

	sortCategories() {

	}

	parseObject(obj) {}

	splitDodatneLastnosti() {}

	splitSlike() {}

	executeAll() {
		this.createDataObject();
		this.sortCategories();
		this.insertDataIntoDb();
	}
}