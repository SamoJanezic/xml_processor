import dobaviteljController from "./dobaviteljController.js";
import { AsbisAttributes } from "./attriburteControllers/AsbisAttributes.js";

export class asbisController extends dobaviteljController {
	name = "asbis";
	file = [
		{ fileName: "asbis1.xml", node: "ProductCatalog.Product" },
		{ fileName: "asbis2.xml", node: "CONTENT.PRICES.PRICE" },
	];
	keys = [
		"EAN",
		"ProductDescription",
		"niPodatka",
		"niPodatka",
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

	exceptions(product) {
		const ignoreCategory = [
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
			""
		];
		if (ignoreCategory.includes(product.ProductType)) {
			return true;
		}
		if (
			product.EAN.length < 5 ||
			!product.AVAIL ||
			product.AVAIL === "" ||
			product.AVAIL === " " ||
			product.EAN === "" ||
			product.EAN === " "
		) {
			return true;
		}
		// return true;
	}

	sortCategories() {
		// const allCategories= [];
		this.allData.forEach((el) => {
			switch (el.kategorija) {
				case "Antenna":
				case "Networking - Accessories":
				case "Networking - Cloud Keys & Gateways - Cloud Key Enterprise":
				case "Network Management Module":
				case "Network Interface Card":
				case "Networking - Range Extender":
					el.kategorija = "Mrežne kartice, antene, WIFI ojačevalci";
					break;
				case "Networking - Router":
					if(el.dodatne_lastnosti) {
						el.dodatne_lastnosti.push({"@_Name": 'Vrsta', "@_Value": 'Usmerjevalnik'});
					}
				case "Networking - Transceiver":
					if(el.dodatne_lastnosti) {
						el.dodatne_lastnosti.push({"@_Name": 'Vrsta', "@_Value": 'Usmerjevalnik'});
					}
				case "Networking - Wireless Outdoor Access Point":
				case "Networking - Wireless Access Point":
					if(el.dodatne_lastnosti) {
						el.dodatne_lastnosti.push({"@_Name": 'Vrsta', "@_Value": 'Dostopna točka'});
					}
				case "Network Switch":
					if(el.dodatne_lastnosti) {
						el.dodatne_lastnosti.push({"@_Name": 'Vrsta', "@_Value": 'Stikalo'});
					}
					el.kategorija = "Usmerjevalniki, stikala in AP";
					break;
				case "Security - Surveillance Video Recorder":
					el.kategorija = "Snemalniki";
					break;
				case "Vacuum Cleaner Robot":
				case "Vacuum Cleaner Stick":
				case "Vacuum Cleaner Transformer":
				case "Acc - Vacuum Cleaners":
					el.kategorija = "Sesalniki";
					break;
				case "Memory NAS":
				case "NAS Accessories":
				case "Desktop NAS":
				case "Rack NAS":
					el.kategorija = "NAS sistemi";
					break;
				case "Acc - Blenders":
				case "Hand Blender":
					el.kategorija = "Mešalniki";
					break;
				case "SSD NAS":
				case "HDD NAS":
				case "HDD/SSD Enclosure":
				case "HDD Video Surveillance":
				case "HDD Server":
				case "HDD External":
				case "HDD Mobile":
				case "HDD Desktop":
				case "SSD strežniški diski":
				case "SSD diski":
				case "SSD External":
				case "HDD Cabinet":
					el.kategorija = "Trdi diski";
					break;
				case "Intercom Panel":
					el.kategorija = "Domofoni";
					break;
				case "Liquidaiser":
				case "Irrigators":
				case "Solar Panel":
				case "Pametni senzorji":
				case "Smart Heaters":
					el.kategorija = "Naprave za pametni dom";
					break;
				case "ODD Blu-RAY Writers":
				case "ODD DVD-RW External Slim":
				case "ODD Blu-ray Writer External Desktop":
				case "ODD DVD-RW":
					el.kategorija = "Optične enote";
					break;
				case "Gaming Chair":
				case "Gaming Desk":
					el.kategorija = "Gaming stoli";
					break;
				case "Multimedia - Speaker Wi-Fi":
				case "Multimedia - Speaker Bluetooth":
				case "Multimedia - Audio System":
				case "Multimedia - Speaker":
					el.kategorija = "HI-FI in prenosni zvočniki";
					break;
				case "Acc - Dental care":
				case "Ščetke za zobe":
					el.kategorija = "Ustna nega";
					break;
				case "IPad Accessories":
					el.kategorija = "Tablični računalniki";
					break;
				case "TWS Bluetooth Headsets":
				case "Multimedia - Headset":
				case "Multimedia - PC Headsets":
				case "Bluetooth Headset":
				case "Gaming Headset":
					el.kategorija = "Slušalke";
					break;
				case "Web Camera":
				case "VC WebCams":
					el.kategorija = "Spletne kamere";
					break;
				case "Server Desktop":
				case "Main Board Server":
					el.kategorija = "Strežniki";
					break;
				case "CPU Desktop":
					el.kategorija = "Procesorji";
					break;
				case "Video Conferencing Solution":
					el.kategorija = "Konferenčna oprema";
					break;
				case "Software Electronic Keys":
				case "Soft OEM. MS OS for PC":
					el.kategorija = "Programska oprema";
					break;
				case "Zaslon velikega formata":
				case "LED monitor":
					el.kategorija = "Monitorji";
					break;
				case "PC NetTop":
				case "PC Barebone":
					el.kategorija = "Mini";
					break;
				case "Power Supply Unit":
					el.kategorija = "Napajalniki";
					break;
				case "PC Chassis":
					el.kategorija = "Ohišja";
					break;
				case "Torbica za prenašanje":
				case "Cooling stand for Notebook":
					el.kategorija = "Dodatki za prenosnike";
					break;
				case "Cooling System":
					el.kategorija = "Hlajenje";
					break;
				case "Input Devices - Mouse Box":
				case "Input Devices - Mouse":
				case "Input Devices - Pointing Device Box":
				case "Gaming Mouse":
				case "Gaming Mousepads":
					el.kategorija = "Miške";
					break;
				case "Input Devices - Keyboard Box":
				case "Input Devices - Keyboard":
				case "Gaming Keyboard":
					el.kategorija = "Tipkovnice";
					break;
				case "Osnovna plošča za namizni računalnik":
					el.kategorija = "Osnovne plošče";
					break;
				case "Memory Gaming Desktop":
				case "Memory ( Server )":
				case "Memory ( Mobile )":
				case "Memory ( Desktop )":
					el.kategorija = "Pomnilniki";
					break;
				case "Acc - Air Purifiers":
				case "Čistilci zraka":
					el.kategorija = "Razvlažilci zraka";
					break;
				case "Mouse Pad":
					el.kategorija = "Podloge";
					break;
				case "Graphics Processing Unit":
				case "Video Card":
					el.kategorija = "Grafične kartice";
					break;
				case "Gaming Controller":
				case "Gaming Accessories":
				case "Gaming Microphone":
				case "Gaming pripomočki":
					el.kategorija = "Gaming pripomočki";
					break;
				case "Security - Surveillance System Accessories":
				case "IP Camera":
					el.kategorija = "Kamere";
					break;
				case "LED TV":
					el.kategorija = "Televizije";
					break;
				case "Acc - Multibakers/Grills":
				case "Grills":
					el.kategorija = "Žari";
					break;
				case "Vacuum Sealers":
					el.kategorija = "Vakumski aparati";
					break;
				case "Feni za lase":
				case "Hair Stylers":
					el.kategorija = "Nega las";
					break;
				case "Kavni aparati":
					el.kategorija = "Priprava kave in čaja";
					break;
				case "Tehtnice za kopalnico":
					el.kategorija = "Pripomočki za osebno nego";
					break;
				case "Acc - Steam Mops":
				case "Steam Mops":
				case "Cleaning Articles":
					el.kategorija = "Čistilci na tlak in metle";
					break;
				case "Sous-Vide":
				case "Kuhalniki na paro":
					el.kategorija = "Kuhalniki";
					break;
				case "Kuhinjske tehtnice":
					el.kategorija = "Tehtnice";
					break;
				case "Plates and ovens":
				case "Otroška ura":
				case "Pametna ura":
					el.kategorija = "Športne ure";
					break;
				case "Robot Kitchen":
					el.kategorija = "Kuhinjski roboti";
					break;
			}
			// if(!allCategories.includes(el.kategorija)) {
			// 	allCategories.push(el.kategorija)
			// }
		});
		// console.log(allCategories)
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
		if (obj.element && obj.element.length) {
			return obj.element;
		}
		return Object.values(obj);
	}

	formatZaloga(zaloga) {
		return zaloga > 0 ? "Na zalogi" : "Ni na zalogi";
	}

	splitDodatneLastnosti() {
		let lastnosti = [];

		this.allData.forEach((data) => {
					lastnosti.push({ean: data.ean, kategorija: data.kategorija, lastnostNaziv: 'Proizvajalec', lastnostVrednost: data.blagovna_znamka});
					const Attributes = new AsbisAttributes(data.kategorija, data.dodatne_lastnosti);
					const attrs = Attributes.formatAttributes()
					if (attrs !== null && Object.keys(attrs).length !== 0) {
						for (const el in attrs) {
							lastnosti.push({ean: data.ean, kategorija: data.kategorija, lastnostNaziv: el, lastnostVrednost: attrs[el]});
						}
					}
					this.komponenta = lastnosti.map(el => { return {KATEGORIJA_kategorija: el.kategorija, komponenta: el.lastnostNaziv}});
					this.atribut = lastnosti.map(el => { return {izdelek_ean: el.ean, KOMPONENTA_komponenta:el.lastnostNaziv, atribut: el.lastnostVrednost}});
				});
	}

	splitSlike() {
		let slike = [];
		this.allData.forEach((data) => {
			slike.push({
				izdelek_ean: data.ean,
				slika_url: data.slika_mala,
				tip: "mala",
			});
			slike.push({
				izdelek_ean: data.ean,
				slika_url: data.slika_velika,
				tip: "velika",
			});
			if (data.dodatne_slike && data.dodatne_slike[0]) {
				if (typeof data.dodatne_slike[0] === "object") {
					data.dodatne_slike[0].forEach((el) => {
						slike.push({
							izdelek_ean: data.ean,
							slika_url: el,
							tip: "dodatna",
						});
					});
				} else {
					data.dodatne_slike.forEach((el) => {
						slike.push({
							izdelek_ean: data.ean,
							slika_url: el,
							tip: "dodatna",
						});
					});
				}
			}
		});
		this.slika = slike;
	}

	getEprel(str) {
		// if (str.length < 15) {
		// 	return str;
		// } else {
		// 	const decodedStr = str
		// 		.replace(/&lt;/g, "<")
		// 		.replace(/&gt;/g, ">")
		// 		.replace(/&quot;/g, '"');
		// 	const match = decodedStr.match(/<a[^>]*>(\d+)<\/a>/);
		// 	return match[1];
		// }
	}

	executeAll() {
		this.combineData();
		this.createDataObject();
		this.sortCategories();
		this.splitSlike();
		this.splitDodatneLastnosti();
		this.insertDataIntoDb();
	}
}
