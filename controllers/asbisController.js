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
		"Image",
		"Images",
		"AttrList",
		"Vendor",
		"ProductType",
		"niPodatka",
		"dobavitelj",
		"AVAIL"
	];

	exceptions(product) {
		const ignoreCategory = [
			'Various Accessories',
			'Wireless Charger',
			'Power Battery Charger',
			'Mounting Hardware',
			'Car Accessories',
			'Pc Mobile Accessories',
			'Avtomobilski video snemalnik',
			'Cables USB',
			'Cable',
			'Power Adapter',
			'Controller Card',
			'Bluetooth Adapter',
			'USB Hub',
			'Multiboard',
			'IDS Totem'

		];
		if (ignoreCategory.includes(product.ProductType)) {
			return true;
		}
	};

	sortCategories() {
		// const allCategories= [];
		this.allData.forEach((el) => {
			switch (el.kategorija) {
				case "Antenna":
				case 'Networking - Accessories':
				case 'Networking - Cloud Keys & Gateways - Cloud Key Enterprise':
				case 'Network Management Module':
				case 'Networking - Cables':
				case 'Network Interface Card':
				case 'Networking - Range Extender':
					el.kategorija = "Mrežne kartice, antene, WIFI ojačevalci";
					break;
				case 'Networking - Wireless Outdoor Access Point':
				case 'Networking - Router':
				case 'Networking - Transceiver':
				case 'Networking - Wireless Access Point':
				case 'Network Switch':
					el.kategorija = 'Usmerjevalniki, stikala in AP';
					break;
				case 'Security - Surveillance Video Recorder':
					el.kategorija = "Snemalniki";
					break;
  				case 'Vacuum Cleaner Robot':
  				case 'Vacuum Cleaner Stick':
				case 'Vacuum Cleaner Transformer':
				case 'Acc - Vacuum Cleaners':
					el.kategorija = "Sesalniki";
					break;
  				case 'Memory NAS':
				case 'NAS Accessories':
				case 'Desktop NAS':
				case 'SSD NAS':
				case 'Rack NAS':
				case 'HDD NAS':
					el.kategorija = 'NAS Sistemi';
					break;
  				case 'Acc - Blenders':
				case 'Hand Blender':
					el.kategorija = "Mešalniki";
					break;
				case 'HDD/SSD Enclosure':
				case 'HDD Video Surveillance':
				case 'HDD Server':
				case 'HDD External':
				case 'HDD Mobile':
				case 'HDD Desktop':
				case 'SSD strežniški diski':
				case 'SSD diski':
				case 'SSD External':
				case 'HDD Cabinet':
					el.kategorija = "Trdi diski";
					break;
  				case 'Intercom Panel':
					el.kategorija = 'Domofoni';
					break;
				case 'Liquidaiser':
				case 'Irrigators':
				case 'Solar Panel':
				case 'Pametni senzorji':
				case 'Smart Heaters':
					el.kategorija = 'Naprave za pametni dom';
					break;
				case 'ODD Blu-RAY Writers':
				case 'ODD DVD-RW External Slim':
				case 'ODD Blu-ray Writer External Desktop':
				case 'ODD DVD-RW':
					el.kategorija = 'Optične enote';
					break;
				case 'Gaming Chair':
				case 'Gaming Desk':
					el.kategorija = 'Gaming stoli';
					break;
  				case 'Multimedia - Speaker Wi-Fi':
				case 'Multimedia - Speaker Bluetooth':
				case 'Multimedia - Audio System':
				case 'Multimedia - Speaker':
					el.kategorija = 'HI-FI in prenosni zvočniki';
					break;
  				case 'Acc - Dental care':
				case 'Ščetke za zobe':
					el.kategorija = 'Ustna nega';
					break;
  				case 'IPad Accessories':
					el.kategorija = 'Tablični računalniki';
					break;
				case 'TWS Bluetooth Headsets':
				case 'Multimedia - Headset':
				case 'Multimedia - PC Headsets':
				case 'Bluetooth Headset':
				case 'Gaming Headset':
					el.kategorija = 'Slušalke';
					break;
  				case 'Web Camera':
				case 'VC WebCams':
					el.kategorija = 'Spletne kamere';
					break;
  				case 'Server Desktop':
				case 'Main Board Server':
					el.kategorija = 'Strežniki';
					break;
  				case 'CPU Desktop':
					el.kategorija = 'Namizni računalniki';
					break;
  				case 'Video Conferencing Solution':
					el.kategorija = 'Konferenčna oprema';
					break;
  				case 'Software Electronic Keys':
  				case 'Soft OEM. MS OS for PC':
					el.kategorija = 'Programska oprema';
					break;
  				case 'Zaslon velikega formata':
  				case 'LED monitor':
					el.kategorija = 'Monitorji';
					break;
  				case 'PC NetTop':
				case 'PC Barebone':
					el.kategorija = 'Mini';
					break;
  				case 'Power Supply Unit':
					el.kategorija = 'Napajalniki';
  				case 'PC Chassis':
					el.kategorija = 'Ohišja';
					break;
  				case 'Torbica za prenašanje':
				case 'Cooling stand for Notebook':
					el.kategorija = "Dodatki za prenosnike";
					break;
  				case 'Cooling System':
					el.kategorija = 'Hlajenje';
				case 'Input Devices - Mouse Box':
				case 'Input Devices - Mouse':
				case 'Input Devices - Pointing Device Box':
				case 'Gaming Mouse':
					el.kategorija = 'Miške';
				case 'Input Devices - Keyboard Box':
				case 'Input Devices - Keyboard':
				case 'Gaming Keyboard':
					el.kategorija = 'Tipkovnice';
					break;
  				case 'Osnovna plošča za namizni računalnik':
					el.kategorija = 'Osnovne plošče';
					break;
  				case 'Memory Gaming Desktop':
  				case 'Memory ( Server )':
  				case 'Memory ( Mobile )':
  				case 'Memory ( Desktop )':
					el.kategorija = 'Pomnilniki';
					break;
				case 'Acc - Air Purifiers':
				case 'Čistilci zraka':
					el.kategorija = 'Razvlažilci zraka';
				case 'Mouse Pad':
					el.kategorija = 'Podloge';
					break;
  				case 'Graphics Processing Unit':
  				case 'Video Card':
					el.kategorija = 'Grafične kartice';
					break;
				case 'Gaming Controller':
				case 'Gaming Accessories':
				case 'Gaming Microphone':
					el.kategorija = 'Gaming pripomočki';
					break;
				case 'Security - Surveillance System Accessories':
				case 'IP Camera':
					el.kategorija = 'Kamere';
				case 'LED TV':
					el.kategorija = 'Televizije';
					break;
				case 'Acc - Multibakers/Grills':
  				case 'Grills':
					el.kategorija = 'Žari';
					break;
  				case 'Vacuum Sealers':
					el.kategorija = 'Vakumski aparati';
					break;
  				case 'Feni za lase':
				case 'Hair Stylers':
					el.kategorija = 'Nega las';
					break;
  				case 'Kavni aparati':
					el.kategorija = 'Priprava kave in čaja';
					break;
  				case 'Tehtnice za kopalnico':
					el.kategorija = 'Pripomočki za osebno nego';
					break;
				case 'Acc - Steam Mops':
  				case 'Steam Mops':
				case 'Cleaning Articles':
					el.kategorija = 'Čistilci na tlak in metle';
					break;
  				case 'Sous-Vide':
				case 'Kuhalniki na paro':
					el.kategorija = 'Kuhalniki';
  				case 'Kuhinjske tehtnice':
					el.kategorija = 'Tehtnice';
  				case 'Plates and ovens':
  				case 'Otroška ura':
  				case 'Pametna ura':
					el.kategorija = 'Športne ure';
					break;
  				case 'Robot Kitchen':
					el.kategorija = 'Kuhinjski roboti';
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
		// console.log(combinedData);
		return combinedData;
	}

	parseObject(obj) {
		// if (typeof obj.element === "string") {
		// 	return obj.element;
		// }
		// if (obj.element && obj.element.length) {
		// 	console.log(obj.element)
		// }
		return Object.values(obj);
	}

	formatZaloga(zaloga) {

	}

	splitDodatneLastnosti() {
		const exceptions = ["EAN koda", "Proizvajalčeva koda", " ", "/", "", "brez"];
		let lastnosti = [];

		this.allData.forEach(data => {
			if (data.dodatne_lastnosti && data.dodatne_lastnosti.lastnost) {
				if(!data.dodatne_lastnosti.lastnost.length) {
					lastnosti.push({ean: data.ean, kategorija: data.kategorija, lastnostNaziv: data['@_naziv'], lastnostVrednost: data['#text']})
				} else {
					data.dodatne_lastnosti.lastnost.forEach(el => {
					if(exceptions.includes(el['@_naziv']) || exceptions.includes(el['#text']) || el['@_naziv'].includes('dodatno')) {
						return;
					}
						lastnosti.push({ean: data.ean, kategorija: data.kategorija, lastnostNaziv: el['@_naziv'], lastnostVrednost: el['#text']})
					})
				}
			}
		});
		this.komponenta = lastnosti.map(el => { return {KATEGORIJA_kategorija: el.kategorija, komponenta: el.lastnostNaziv}});
		this.atribut = lastnosti.map(el => { return {izdelek_ean: el.ean, KOMPONENTA_komponenta:el.lastnostNaziv, atribut: el.lastnostVrednost}});
	};

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
			if(data.dodatne_slike && data.dodatne_slike[0]) {
				if(typeof(data.dodatne_slike[0]) === 'object') {
					data.dodatne_slike[0].forEach(el => {
						slike.push({
							izdelek_ean: data.ean,
							slika_url: el,
							tip: 'dodatna',
						});
					});
				} else {
					data.dodatne_slike.forEach(el => {
						slike.push({
							izdelek_ean: data.ean,
							slika_url: el,
							tip: 'dodatna',
						});
					});
				}
			}
		});
		this.slika = slike;
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
		this.sortCategories();
		this.splitSlike();
		this.splitDodatneLastnosti();
		this.insertDataIntoDb();
	}
}
