import DobaviteljController from "./DobaviteljController.js";

export class AsbisController extends DobaviteljController {
	constructor(categoryMap, Attributes, ...args) {
		super(...args);
		this.categoryMap = categoryMap;
		this.Attributes = Attributes;
	}
	name = "asbis";
	file = [
		{ fileName: "asbis1.xml", node: "ProductCatalog.Product" },
		{ fileName: "asbis2.xml", node: "CONTENT.PRICES.PRICE" },
	];
	encoding = "utf8";
	keys = [
		"EAN",
		"ProductDescription",
		"niPodatka",
		"MarketingInfo",
		"niPodatka",
		"MY_PRICE",
		"RETAIL_PRICE",
		"niPodatka",
		"SMALL_IMAGE",
		"Image",
		"Images",
		"AttrList",
		"Vendor",
		"ProductType",
		"niPodatka",
		"AVAIL",
	];

	 ignoreCategorySet = new Set([
		"Various Accessories",
		"Wireless Charger",
		"Power Battery Charger",
		"Mounting Hardware",
		"Car Accessories",
		"Pc Mobile Accessories",
		"Avtomobilski video snemalnik",
		"Cables USB",
		"Cable",
		"Power Adapter",
		"Controller Card",
		"Bluetooth Adapter",
		"USB Hub",
		"Multiboard",
		"IDS Totem",
		"Networking - Cables",
		"Žari",
		"Nega las",
		"Čistilci na tlak in metle",
		"Priprava kave in čaja",
		"Pripomočki za osebno nego",
		"IPad Accessories",
		"HDD Cabinet",
		"HDD/SSD Enclosure",
		"Intercom Panel",
		"Antenna",
		"Networking - Accessories",
		"Networking - Cloud Keys & Gateways - Cloud Key Enterprise",
		"Network Management Module",
		"Network Interface Card",
		"Networking - Range Extender",
		"PC Barebone",
		"PC NetTop",
		"Server Desktop",
		"Main Board Server",
		"Acc - Dental care",
		"Ščetke za zobe",
		"Čistilci na tlak in metle",
		"Pripomočki za osebno nego",
		"Networked Storage Device",
		"VC Docks",
		"Smart Tracker",
	]);

	routerTypes = {
		"Networking - Router": "Usmerjevalnik",
		"Networking - Transceiver": "Usmerjevalnik",
		"Networking - Wireless Outdoor Access Point": "Dostopna točka",
		"Networking - Wireless Access Point": "Dostopna točka",
		"Network Switch": "Stikalo"
	};

	exceptions(product) {
		if (this.ignoreCategorySet.has(product.ProductType)) return true;
		if (
			product.EAN.length < 5 ||
			!product.AVAIL ||
			product.AVAIL === "" ||
			product.AVAIL === " "
		) {
			return true;
		}
	}

	combineData() {
		const [opisi, cene] = this.getData();
        return opisi.flatMap(opis =>
            cene
                .filter(cena => opis.ProductCode === cena.WIC)
                .map(cena => ({ ...opis, ...cena }))
        );
		return combinedData;
	}

	parseObject(obj) {
		return obj.element?.length ? obj.element : Object.values(obj);
	}

	formatZaloga(zaloga) {
		return zaloga > 0 ? "Na zalogi" : "Ni na zalogi";
	}

	processOpis(opis) {
		return (opis !== null && typeof opis !== "string" && opis[0]?.length)
            ? opis[0]
            : opis;
	}
}
