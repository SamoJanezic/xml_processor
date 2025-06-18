export class AlsoAttributes {
	constructor(category, attribute) {
		this.category = category;
		this.attribute = attribute;
	}

	formatAttributes() {
		let match;
		const attributes = {};

		// if (this.category === 'Prenosniki') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_name']) {
		// 			case 'Procesor':
		// 				attributes['Procesor'] = el['#text']
		// 				break;
		// 			case 'Grafika':
		// 				attributes['Grafična kartica'] = el['#text']
		// 				break;
		// 			case 'Vrsta izdelka':
		// 				attributes['Namen uporabe'] = el['#text']
		// 				break;
		// 			case 'Prikaz':
		// 				match = el['#text'].match(/\b\d+(\.\d+)?"/);
		// 				if (match) {
		// 					attributes['Velikost zaslona'] = match[0].replace(',', '.'); // Normalize to decimal format
		// 				}
		// 				match = el['#text'].match(/\b\d{3,4}\s?[×x]\s?\d{3,4}\b/i)
		// 				if (match) {
		// 					attributes['Ločljivost'] = match[0].replace('×', 'x').replaceAll(' ', '')
		// 				}
		// 				break;
		// 			case 'Delovni Spomin':
		// 				match = el['#text'].match(/\b\d+\s?(GB|MB|TB)\b/i);
		// 				if(match) {
		// 					attributes['Kapaciteta pomnilnika'] = match[0];
		// 				}
		// 				break;
		// 			case 'Prostor trdega diska':
		// 				match = el['#text'].match(/\b\d+\s?(GB|MB|TB)\b/i);
		// 				if(match) {
		// 					attributes['Kapaciteta diska'] = match[0];
		// 				}
		// 				break;
		// 			case 'Operacijski sistem':
		// 				attributes['Operacijski sistem'] = el['#text']
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Monitorji') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_name']) {
		// 			case 'Ločljivost':
		// 				match = el['#text'].match(/\b\d{3,4}\s?[×x]\s?\d{3,4}\b/i)
		// 				if (match) {
		// 					attributes['Ločljivost'] = match[0].replace('×', 'x').replaceAll(' ', '')
		// 				} else {
		// 					break;
		// 				}
		// 				break;
		// 			case 'Vrsta naprave':
		// 				match = el['#text'].match(/\b\d+(\.\d+)?"/);
		// 				if (match) {
		// 					attributes['Velikost zaslona'] = match[0]; // Normalize to decimal format
		// 				}
		// 				break;
		// 			case 'Vrsta plošče':
		// 				attributes['Matrika'] = el['#text']
		// 				break;
		// 			case 'Hitrost osveževanja':
		// 				attributes['Osveževanje'] = el['#text'].replace(' ','')
		// 				break;
		// 			case 'Zvočniki':
		// 				attributes['Zvočniki'] = el['#text']
		// 				break;
		// 			case 'Ukrivljen zaslon':
		// 				attributes['Ukrivljen zaslon'] = el['#text']
		// 				break;
		// 			case 'Vhodni priključki':
		// 				attributes['Vhodi'] = el['#text']
		// 				break;
		// 			case 'Razmerje širine in širine':
		// 				attributes['Format'] = el['#text']
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Namizni računalniki') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_name']) {
		// 			case 'Vrsta procesorja':
		// 				attributes['Procesor'] = el['#text']
		// 				break;
		// 			case 'Grafični krmilnik':
		// 				attributes['Grafična kartica'] = el['#text']
		// 				break;
		// 			case 'Velikost pomnilnika':
		// 				attributes['Kapaciteta pomnilnika'] = el['#text']
		// 				break;
		// 			case 'SSD pogon':
		// 				attributes['Kapaciteta diska'] = el['#text']
		// 				break;
		// 			case 'Sistem za operacijski sistem':
		// 				attributes['Operacijski sistem'] = el['#text']
		// 				break;
		// 			default:
		// 				attributes[el['@_name']] = el['#text']
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === "All in one") {
		// 	this.attribute.forEach((el) => {
		// 		switch (el["@_name"]) {
		// 			case "Procesor":
		// 				attributes["Procesor"] = el["#text"];
		// 				break;
		// 			case "Grafični krmilnik":
		// 				attributes["Grafična kartica"] = el["#text"];
		// 				break;
		// 			case "Monitor":
		// 				if (el["#text"].includes("dotik")) {
		// 					attributes["Vrsta zaslona"] = "Touch";
		// 				}
		// 				const diagonalMatch =
		// 					el["#text"].match(/\b\d+(\.\d+)?"/);
		// 				attributes["Velikost zaslona"] = diagonalMatch
		// 					? diagonalMatch[0]
		// 					: null;
		// 				const resolutionMatch = el["#text"].match(
		// 					/\b\d{3,4}\s?[x×]\s?\d{3,4}\b/i
		// 				);
		// 				attributes["Ločljivost"] = resolutionMatch
		// 					? resolutionMatch[0]
		// 							.replace(/\s?×\s?/i, " x ")
		// 							.replace(/\s+/g, " ") : null;
		// 				break;
		// 			case "OVEN":
		// 				attributes["Kapaciteta pomnilnika"] =
		// 					el["#text"].match(/^\d+\sGB/)[0];
		// 				break;
		// 			case "Trdi disk":
		// 				const match = el["#text"].match(
		// 					/\b\d+(\.\d+)?\s?(TB|GB|MB)\b/i
		// 				);
		// 				attributes["Kapaciteta diska"] = match
		// 					? match[0].replace(/\s?/, " ") : null;
		// 				break;
		// 			case "Sistem za operacijski sistem":
		// 				attributes["Operacijski sistem"] = el["#text"];
		// 				break;
		// 			default:
		// 				attributes[el["@_name"]] = el["#text"];
		// 				break;
		// 		}
		// 	});
		// }
		// if (this.category === 'Tablični računalniki') {
		// 	this.attribute.forEach((el) => {
		// 		switch (el["@_name"]) {
		// 			case "Procesor":
		// 				attributes["Procesor"] = el["#text"];
		// 				break;
		// 			case "Prikaz":
		// 				if (el["#text"].includes("dotik")) {
		// 					attributes["Vrsta zaslona"] = "Touch";
		// 				}
		// 				const diagonalMatch =
		// 					el["#text"].match(/\b\d+(\.\d+)?"/);
		// 				attributes["Velikost zaslona"] = diagonalMatch
		// 					? diagonalMatch[0]
		// 					: null;
		// 				const resolutionMatch = el["#text"].match(
		// 					/\b\d{3,4}\s?[x×]\s?\d{3,4}\b/i
		// 				);
		// 				attributes["Ločljivost"] = resolutionMatch
		// 					? resolutionMatch[0]
		// 							.replace(/\s?×\s?/i, " x ")
		// 							.replace(/\s+/g, " ") : null;
		// 				break;
		// 			case "Delovni spomin":
		// 				attributes["Kapaciteta pomnilnika"] =
		// 					el["#text"].match(/^\d+\sGB/)[0];
		// 				break;
		// 			case "Prostor trdega diska":
		// 				const match = el["#text"].match(
		// 					/\b\d+(\.\d+)?\s?(TB|GB|MB)\b/i
		// 				);
		// 				attributes["ROM"] = match
		// 					? match[0].replace(/\s?/, " ") : null;
		// 				break;
		// 			case "Operacijski sistem":
		// 				attributes["Operacijski sistem"] = el["#text"];
		// 				break;
		// 			default:
		// 				attributes[el["@_name"]] = el["#text"];
		// 				break;
		// 		}
		// 	});
		// }
		// if (this.category === 'Pomnilniki') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_name']) {
		// 			case 'Zmogljivost':
		// 				attributes['Kapaciteta pomnilnika'] = el['#text']
		// 				break;
		// 			case 'Vrsta pomnilnika':
		// 				attributes['Vrsta pomnilnika'] = el['#text']
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Trdi diski') {
		// 	console.log('------------------------------------------------------------------------------------')
		// 	this.attribute.forEach((el) => {
		// 		console.log(el)
		// 		switch(el['@_name']) {
		// 			case 'Zmogljivost':
		// 				attributes['Kapaciteta diska'] = el['#text']
		// 				break;
		// 			case 'Vrsta':
		// 				attributes['Vrsta diska'] = el['#text']
		// 				break;
		// 			case 'Format diska':
		// 				attributes['Tip diska'] = el['#text']
		// 				break;
		// 			case 'Vmesnik (priklop)':
		// 				attributes['Vmesnik'] = el['#text']
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Tiskalniki') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_name']) {
		// 			case 'Vrsta naprave':
		// 				attributes['Vrsta tiskalnika'] = el['#text']
		// 				break;
		// 			case 'Tehnologija tiskanja':
		// 				attribute['Tehnologija tiska'] = el['#text']
		// 				if (el['#text'].includes('barvni')) {
		// 					attribute['Barva tiska'] = 'Barvni'
		// 				}
		// 				break;
		// 			case 'Največja ločljivost tiskanja':
		// 				attributes['Ločljivost tiska'] = el['#text']
		// 				break;
		// 			case 'Možnosti povezave':
		// 				attributes['Povezava tiskalnika'] = 'Brezžična'
		// 				break;
		// 			case 'Velikost medija':
		// 				attributes['Format'] = el['#text']
		// 			default:
		// 				attributes[el['@_name']] = el['#text']
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Potrošni material') {
		// 	console.log('----------------------------------------------------------------------------------')
		// 	this.attribute.forEach((el) => {
		// 		console.log(el)
		// 		switch(el['@_name']) {
		// 			case 'Vrsta kartuše':
		// 			case 'Kompleti':
		// 				attributes['Vrsta'] = 'Kartuša'
		// 				break;
		// 			case 'Format papirja':
		// 				attributes['Vrsta'] = 'Papir'
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Televizije') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_name']) {
		// 			case 'Peron':
		// 				attributes['Smart TV'] = 'Da';
		// 				attributes['Operacijski sistem'] = el['#text']
		// 				break;
		// 			case 'Resolucija':
		// 				attributes['Ločljivost'] = el['#text']
		// 				break;
		// 			case 'Velikost diagonale':
		// 					attributes['Diagonala'] = el['#text']
		// 				break;
		// 			case 'Vrsta izdelka':
		// 				attributes['Vrsta Zaslona'] = el['#text']
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Domači kino') {
		// 	console.log('+__-------------------------------------------------------------__+')
		// 	this.attribute.forEach((el) => {
		// 		console.log(el)
		// 		switch(el['@_name']) {
		// 			case 'Neprekinjena moč':
		// 				attributes['Moč'] = el['#text']
		// 				break;
		// 			case 'Vmesniki':
		// 				attributes['Povezljivost'] = el['#text']
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		if (this.category === 'Projektorji') {
			console.log('+__-------------------------------------------------------------__+')
			this.attribute.forEach((el) => {
				console.log(el)
				switch(el['@_name']) {
					case 'Ločljivost':
						attributes['Ločljivost'] = el['#text']
						break;
					case 'Svetilnost':
						attributes['Svetilnost'] = el['#text']
						break;
					case 'Kontrast':
						attributes['Kontrast'] = el['#text']
						break;
					case 'Tip projektorja':
						attributes['Namen'] = el['#text']
						break;
					case 'Tehnologija':
						attributes['Tehnologija'] = el['#text']
						break;
					default:
						break;
				}
			})
		}
		// if (this.category === 'Pralni stroji') {
		// 	this.attribute.forEach((el) => {
		// 		switch (el['@_name']) {
		// 			case 'Zmogljivost pranja':
		// 				attributes['Kapaciteta'] = el['#text'];
		// 				break;
		// 			case 'Razred energijske učinkovitosti pranja':
		// 				attributes['Energijski razred'] = el['#text'];
		// 				break;
		// 			case 'Največja hitrost ožemanja':
		// 				attributes['št. Obratov centrifuge'] = el['#text'];
		// 				break;
		// 			case 'Inverter motor':
		// 				attributes['Inverter motor'] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	});
		// }
		// if (this.category === 'Sušilni stroji') {
		// 	this.attribute.forEach((el) => {
		// 		switch (el['@_name']) {
		// 			case 'Zmogljivost sušenja':
		// 				attributes['Kapaciteta'] = el['#text'];
		// 				break;
		// 			case 'Razred energijske učinkovitosti sušenja':
		// 				attributes['Energijski razred'] = el['#text'];
		// 				break;
		// 			case 'Toplotna črpalka':
		// 				attributes['Toplotna črpalka'] = el['#text'];
		// 				break;
		// 			case 'Inverter motor':
		// 				attributes['Inverter motor'] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	});
		// }
		// if (this.category === 'Pralno-sušilni stroji') {
		// 	this.attribute.forEach((el) => {
		// 		switch (el['@_name']) {
		// 			case 'Zmogljivost pranja':
		// 				attributes['Kapaciteta pranja'] = el['#text'];
		// 				break;
		// 			case 'Zmogljivost sušenja':
		// 				attributes['Kapaciteta sušenja'] = el['#text'];
		// 				break;
		// 			case 'Razred energijske učinkovitosti pranja in sušenja':
		// 				attributes['Energijski razred pranja'] = el['#text'];
		// 				break;
		// 			case 'Inverter motor':
		// 				attributes['Inverter motor'] = el['#text'];
		// 				break;
		// 			case 'Največja hitrost ožemanja':
		// 				attributes['Centrifuga'] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	});
		// }
		// if (this.category === 'Pomivalni stroji') {
		// 	this.attribute.forEach((el) => {
		// 		switch (el['@_name']) {
		// 			case 'Mere (Š x V x G)':
		// 				const dimenzije = el['#text'].match(/\d+/g);
		// 				if (dimenzije) {
		// 					attributes['Širina'] = dimenzije[0];
		// 					attributes['Višina'] = dimenzije[1];
		// 				}
		// 				break;
		// 			case 'Namestitev':
		// 				attributes['Tip'] = el['#text'];
		// 				break;
		// 			case 'Število pogrinjkov':
		// 				attributes['Število pogrinjkov'] = el['#text'];
		// 				break;
		// 			case 'Zaščita pred izlivom vode':
		// 				attributes['Aqua stop'] = 'Da';
		// 				break;
		// 			case 'Zlaganje pribora':
		// 				if(el['#text'] === 'Predal') {
		// 					attributes['Tretja košara'] = 'Da';
		// 				}
		// 			case 'Energetski razred':
		// 				attributes['Energijski razred'] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	});
		// }
		// if (this.category === 'Hladilniki') {
		// 	this.attribute.forEach((el) => {
		// 		switch (el['@_name']) {
		// 			case 'Vrsta hladilnika':
		// 				attributes['Vrsta'] = el['#text'];
		// 				break;
		// 			case 'Energetski razred':
		// 				attributes['Energijski razred'] = el['#text'];
		// 				break;
		// 			case 'Položaj zamrzovalnika':
		// 				attributes['Položaj zamrzovalnika'] = el['#text'];
		// 				break;
		// 			case 'Samodejno odtajevanje':
		// 				attributes['No frost'] = el['#text'];
		// 				break;
		// 			case 'Višina dodatno':
		// 				attributes['Višina'] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	});
		// }
		// if (this.category ==='Zamrzovalniki') {
		// 	this.attribute.forEach((el) => {
		// 		switch (el['@_name']) {
		// 			case 'Vrsta zmrzovalne skrinje':
		// 				attributes['Vrsta'] = el['#text'];
		// 				break;
		// 			case 'Energetski razred':
		// 				attributes['Energijski razred'] = el['#text'];
		// 				break;
		// 			case 'Samodejno odtajevanje':
		// 				attributes['No frost'] = el['#text'];
		// 				break;
		// 			case 'Višina dodatno':
		// 				attributes['Višina'] = el['#text'];
		// 				break;
		// 			case 'Prostornina zmrzovalnika dodatno':
		// 				attributes['Prostornina zmrzovalnika'] = el['#text']
		// 				break;
		// 			case 'Mere (Š x V x G)':
		// 				const dimenzije = el['#text'].match(/\d+/g);
		// 				if (dimenzije) {
		// 					attributes['Širina'] = dimenzije[0];
		// 					attributes['Višina'] = dimenzije[1];
		// 				}
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	});
		// }
		// if (this.category === 'Pečice') {
		// 	this.attribute.forEach((el) => {
		// 		switch (el['@_name']) {
		// 			case 'Namestitev':
		// 				attributes['Tip'] = el['#text'];
		// 				break;
		// 			case 'Energetski razred':
		// 				attributes['Energijski razred'] = el['#text'];
		// 				break;
		// 			case 'Prostornina pečice dodatno':
		// 				attributes['Prostornina'] = el['#text'];
		// 				break;
		// 			case 'Mere (Š x V x G)':
		// 				const dimenzije = el['#text'].match(/\d+/g);
		// 				if (dimenzije) {
		// 					attributes['Višina'] = dimenzije[1];
		// 				}
		// 				break;
		// 			case 'Način čiščenja':
		// 				attributes['Način čiščenja'] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	});
		// }
		// if (this.category === 'Kuhališča') {
		// 	this.attribute.forEach((el) => {
		// 		switch (el['@_name']) {
		// 			case 'Namestitev kuhalne plošče':
		// 				attributes['Tip'] = el['#text'];
		// 				break;
		// 			case 'Število kuhališč':
		// 				attributes['Število kuhališč'] = el['#text'];
		// 				break;
		// 			case 'Vrsta kuhalne plošče':
		// 				attributes['Vrsta kuhalne plošče'] = el['#text'];
		// 				break;
		// 			case 'Širina dodatno':
		// 				attributes['Širina'] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	});
		// }
		// if (this.category === 'Nape') {
		// 	this.attribute.forEach((el) => {
		// 		switch (el['@_name']) {
		// 			case 'Energetski razred':
		// 				attributes['Energijski razred'] = el['#text'];
		// 				break;
		// 			case 'Vrsta nape':
		// 				attributes['Tip'] = el['#text'];
		// 				break;
		// 			case 'Mere (Š x V x G)':
		// 				const dimenzije = el['#text'].match(/\d+/g);
		// 				if (dimenzije) {
		// 					attributes['Širina'] = dimenzije[0];
		// 				}
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	});
		// }
		return attributes;
	}
}
