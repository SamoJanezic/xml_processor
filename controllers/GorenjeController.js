import { xmlParser } from "./parseController.js";
import DobaviteljController from "./DobaviteljController.js";

export class GorenjeController extends DobaviteljController {
	name = "gorenje";
	nodes = "mabagor";
	file = "gorenje.xml";
	encoding = "utf8";
	keys = [
		"ean",
		"izdelek_ime",
		"kratki_opis",
		"opis",
		"cena_nabavna",
		"dealer_cena",
		"ppc",
		"davcna_stopnja",
		"slika_mala",
		"slika_velika",
		"dodatne_slike",
		"dodatne_lastnosti",
		"blagovna_znamka",
		"kategorija",
		"eprel_id",
		"zaloga",
	];


	createDataObject() {
		const data = xmlParser(this.file, this.nodes, this.encoding);
		// data.forEach(el => {
		// 	console.log(el)
		// })
		console.log(data.features.feature)
		// data.products.product.flatMap((el) => console.log(el));
		// this.getSingleData(data[0]);
	}

	getSingleData(data) {
		const singleObject = {
			ean: data.product_content.basic_information.product_eans.ean,
			izdelek_ime: data.product_content.basic_information.product_titles.title,
			kratki_opis: data.product_content.basic_information.product_descriptions.short_description,
			opis: data.product_content.basic_information.product_descriptions.long_description,
			cena_nabavna: data.product_content.basic_information.product_prices.msrp,
			dealer_cena: null,
			ppc: data.product_content.basic_information.product_prices.msdp,
			davcna_stopnja: '22',
			// slika_mala:
			// slika_velika:
			// dodatne_slike:
			// dodatne_lastnosti:
			blagovna_znamka: data.product_category_hierarchy.child_category,  //where category_context = product_brand
			kategorija: data.product_category_hierarchy.child_category, // where category_context = product_type,
			eprel_id: null,
			zaloga: 'preveriti',
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

	splitSlike() {

	}

	executeAll() {
		this.createDataObject();
		this.splitDodatneLastnosti();
		this.insertDataIntoDb();
	}
}