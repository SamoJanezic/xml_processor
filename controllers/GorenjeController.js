import { parser } from "./parseController.js";
import DobaviteljController from "./DobaviteljController.js";

export class GorenjeController extends DobaviteljController {
	name = "gorenje";
	nodes = "mabagor.products";
	file = "gorenje.xml";
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


	createDataObject() {
		const data = parser(this.file, this.nodes, this.encoding);
		// data.forEach(el => {
		// 	console.log(el)
		// })
		data.product.flatMap((el) => console.log(el))
		// this.getSingleData(data[0]);
	}

	getSingleData(data) {
		const singleObject = {
			EAN: data.productContent.product_eans,
			izdelekIme: data.izdelekIme,
			niPodatka: data.niPodatka,
			opis: data.opis,
			nabavnaCena: data.nabavnaCena,
			DC: data.DC,
			PPC: data.PPC,
			davcnaStopnja: data.davcnaStopnja,
			slikaMala: data.slikaMala,
			slikaVelika: data.slikaVelika,
			dodatneSlike: this.splitSlike(data.dodatneSlike),
			dodatneLastnosti: this.splitDodatneLastnosti(data.dodatneLastnosti),
			blagovnaZnamka: data.blagovnaZnamka
		};
		console.log(singleObject)
	}

	exceptions(param) {
		const ignoreCategory = [];
	}

	sortCategories() {
	}

	parseObject(obj) {}

	splitDodatneLastnosti() {
		// console.log("🚀 ~ gorenjeController ~ splitDodatneLastnosti ~ allData:", this.allData)
	}

	splitSlike() {}

	executeAll() {
		this.createDataObject();
		this.splitDodatneLastnosti();
		this.insertDataIntoDb();
	}
}