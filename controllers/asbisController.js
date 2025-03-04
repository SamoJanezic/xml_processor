import dobaviteljController from "./dobaviteljController.js";

export class asbisController extends dobaviteljController {
	name = "asbis";
	file = [
		{ fileName: "asbis1.xml", node: "json.ProductCatalog.Product" },
		{ fileName: "asbis2.xml", node: "json.CONTENT.PRICES.PRICE" },
	];
	keys = [
		"ProductCode",
		"EAN",
		"ProductDescription",
		"niPodatka",
		"niPodatka",
		"niPodatka",
		"MY_PRICE",
		"RETAIL_PRICE",
		"niPodatka",
		"SMALL_IMAGE",
		"Images",
		"AttrList",
		"Vendor",
		"ProductType",
		"niPodatka",
		"dobavitelj",
	];

	exceptions(param) {
		if (param["EAN"] === "" || param["EAN"].toString().length < 5) {
			return true;
		}
	}

	combineData() {
		const combinedData = [];
		const asbis1 = this.getData()[0];
		const asbis2 = this.getData()[1];
		asbis1.forEach((product) => {
			asbis2.forEach((price) => {
				if (product.ProductCode === price.WIC) {
					combinedData.push({ ...product, ...price });
				}
			});
		});
		return combinedData;
	}

	parseObject(obj) {
		if (typeof(obj.element) === 'string') {
			return obj.element;
		}
		// if (obj.element && obj.element.length) {
		// 	console.log(obj.element)
		// }
		if (obj.element) {
			return obj;
		}
	}

	splitDodatneLastnosti() {
		let lastnosti = [];
		this.allData.forEach((data) => {
			if(data.dodatne_lastnosti){
				data.dodatne_lastnosti.element.forEach((el) => {
					// if(el['@_naziv'] === "EAN koda" || el['@_naziv'] === "Proizvajalčeva koda" || el['#text'] === ' ' || el['#text'] === '/') {
					// 	return;
					// }
					lastnosti.push({ean: data.ean, kategorija: data.kategorija, lastnostNaziv: el['@_Name'], lastnostVrednost: el['@_Value']})
				})
			}
		});
		this.komponenta = lastnosti.map(el => { return {KATEGORIJA_kategorija: el.kategorija, komponenta: el.lastnostNaziv}});
		this.atribut = lastnosti.map((el) => { return {KOMPONENTA_komponenta:el.lastnostNaziv, atribut: el.lastnostVrednost}});
	}

	getEprel() {
		// if(product.dodatneLastnosti && product.dodatneLastnosti.lastnost && Array.isArray(product.dodatneLastnosti.lastnost)) {
		// 	product.dodatneLastnosti.lastnost.forEach(el => {
		// 		if (el['@_naziv'] === "Energijska nalepka") {
		// 			let eprel = el['#text'].match(/[0-9]+/g)
		// 			console.log(eprel)
		// 		}
		// 	})
		// }
	}

	executeAll() {
		this.combineData();
		this.createDataObject();
		this.getEprel();
		this.splitDodatneLastnosti();
		this.insertDataIntoDb();
	}
}