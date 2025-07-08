export class AlsoAttributes {
	constructor(category, attribute) {
		this.category = category;
		this.attribute = attribute;
	}

	formatAttributes() {
		let match;
		const attributes = {};

		if (this.category === 'Prenosniki') {
			this.attribute.forEach((el) => {
				switch(el['@_name']) {
					case 'Procesor':
						attributes['Procesor'] = el['#text']
						break;
					case 'Grafika':
						attributes['Grafična kartica'] = el['#text']
						break;
					case 'Vrsta izdelka':
						attributes['Namen uporabe'] = el['#text']
						break;
					case 'Prikaz':
						match = el['#text'].match(/\b\d+(\.\d+)?"/);
						if (match) {
							attributes['Velikost zaslona'] = match[0].replace(',', '.'); // Normalize to decimal format
						}
						match = el['#text'].match(/\b\d{3,4}\s?[×x]\s?\d{3,4}\b/i)
						if (match) {
							attributes['Ločljivost'] = match[0].replace('×', 'x').replaceAll(' ', '')
						}
						break;
					case 'Delovni Spomin':
						match = el['#text'].match(/\b\d+\s?(GB|MB|TB)\b/i);
						if(match) {
							attributes['Kapaciteta pomnilnika'] = match[0];
						}
						break;
					case 'Prostor trdega diska':
						match = el['#text'].match(/\b\d+\s?(GB|MB|TB)\b/i);
						if(match) {
							attributes['Kapaciteta diska'] = match[0];
						}
						break;
					case 'Operacijski sistem':
						attributes['Operacijski sistem'] = el['#text']
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			})
		}
		if (this.category === 'Monitorji') {
			this.attribute.forEach((el) => {
				switch(el['@_name']) {
					case 'Ločljivost':
						match = el['#text'].match(/\b\d{3,4}\s?[×x]\s?\d{3,4}\b/i)
						if (match) {
							attributes['Ločljivost'] = match[0].replace('×', 'x').replaceAll(' ', '')
						} else {
							break;
						}
						break;
					case 'Vrsta naprave':
						match = el['#text'].match(/\b\d+(\.\d+)?"/);
						if (match) {
							attributes['Velikost zaslona'] = match[0]; // Normalize to decimal format
						}
						break;
					case 'Vrsta plošče':
						attributes['Matrika'] = el['#text']
						break;
					case 'Hitrost osveževanja':
						attributes['Osveževanje'] = el['#text'].replace(' ','')
						break;
					case 'Zvočniki':
						attributes['Zvočniki'] = el['#text']
						break;
					case 'Ukrivljen zaslon':
						attributes['Ukrivljen zaslon'] = el['#text']
						break;
					case 'Vhodni priključki':
						attributes['Vhodi'] = el['#text']
						break;
					case 'Razmerje širine in širine':
						attributes['Format'] = el['#text']
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			})
		}
		if (this.category === 'Namizni računalniki') {
			this.attribute.forEach((el) => {
				switch(el['@_name']) {
					case 'Vrsta procesorja':
						attributes['Procesor'] = el['#text']
						break;
					case 'Grafični krmilnik':
						attributes['Grafična kartica'] = el['#text']
						break;
					case 'Velikost pomnilnika':
						attributes['Kapaciteta pomnilnika'] = el['#text']
						break;
					case 'SSD pogon':
						attributes['Kapaciteta diska'] = el['#text']
						break;
					case 'Sistem za operacijski sistem':
						attributes['Operacijski sistem'] = el['#text']
						break;
					default:
						attributes[el['@_name']] = el['#text']
						break;
				}
			})
		}
		if (this.category === "All in one") {
			this.attribute.forEach((el) => {
				switch (el["@_name"]) {
					case "Procesor":
						attributes["Procesor"] = el["#text"];
						break;
					case "Grafični krmilnik":
						attributes["Grafična kartica"] = el["#text"];
						break;
					case "Monitor":
						if (el["#text"].includes("dotik")) {
							attributes["Vrsta zaslona"] = "Touch";
						}
						const diagonalMatch =
							el["#text"].match(/\b\d+(\.\d+)?"/);
						attributes["Velikost zaslona"] = diagonalMatch
							? diagonalMatch[0]
							: null;
						const resolutionMatch = el["#text"].match(
							/\b\d{3,4}\s?[x×]\s?\d{3,4}\b/i
						);
						attributes["Ločljivost"] = resolutionMatch
							? resolutionMatch[0]
									.replace(/\s?×\s?/i, " x ")
									.replace(/\s+/g, " ") : null;
						break;
					case "OVEN":
						attributes["Kapaciteta pomnilnika"] =
							el["#text"].match(/^\d+\sGB/)[0];
						break;
					case "Trdi disk":
						const match = el["#text"].match(
							/\b\d+(\.\d+)?\s?(TB|GB|MB)\b/i
						);
						attributes["Kapaciteta diska"] = match
							? match[0].replace(/\s?/, " ") : null;
						break;
					case "Sistem za operacijski sistem":
						attributes["Operacijski sistem"] = el["#text"];
						break;
					default:
						attributes[el["@_name"]] = el["#text"];
						break;
				}
			});
		}
		if (this.category === 'Tablični računalniki') {
			this.attribute.forEach((el) => {
				switch (el["@_name"]) {
					case "Procesor":
						attributes["Procesor"] = el["#text"];
						break;
					case "Prikaz":
						if (el["#text"].includes("dotik")) {
							attributes["Vrsta zaslona"] = "Touch";
						}
						const diagonalMatch =
							el["#text"].match(/\b\d+(\.\d+)?"/);
						attributes["Velikost zaslona"] = diagonalMatch
							? diagonalMatch[0]
							: null;
						const resolutionMatch = el["#text"].match(
							/\b\d{3,4}\s?[x×]\s?\d{3,4}\b/i
						);
						attributes["Ločljivost"] = resolutionMatch
							? resolutionMatch[0]
									.replace(/\s?×\s?/i, " x ")
									.replace(/\s+/g, " ") : null;
						break;
					case "Delovni spomin":
						attributes["Kapaciteta pomnilnika"] =
							el["#text"].match(/^\d+\sGB/)[0];
						break;
					case "Prostor trdega diska":
						const match = el["#text"].match(
							/\b\d+(\.\d+)?\s?(TB|GB|MB)\b/i
						);
						attributes["ROM"] = match
							? match[0].replace(/\s?/, " ") : null;
						break;
					case "Operacijski sistem":
						attributes["Operacijski sistem"] = el["#text"];
						break;
					default:
						attributes[el["@_name"]] = el["#text"];
						break;
				}
			});
		}
		if (this.category === 'Pomnilniki') {
			this.attribute.forEach((el) => {
				switch(el['@_name']) {
					case 'Zmogljivost':
						attributes['Kapaciteta pomnilnika'] = el['#text']
						break;
					case 'Vrsta pomnilnika':
						attributes['Vrsta pomnilnika'] = el['#text']
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			})
		}
		if (this.category === 'Trdi diski') {
			this.attribute.forEach((el) => {
				switch(el['@_name']) {
					case 'Zmogljivost':
						attributes['Kapaciteta diska'] = el['#text']
						break;
					case 'Vrsta':
						attributes['Vrsta diska'] = el['#text']
						break;
					case 'Format diska':
						attributes['Tip diska'] = el['#text']
						break;
					case 'Vmesnik (priklop)':
						attributes['Vmesnik'] = el['#text']
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			})
		}
		if (this.category === 'Tiskalniki') {
			this.attribute.forEach((el) => {
				switch(el['@_name']) {
					case 'Vrsta naprave':
						attributes['Vrsta tiskalnika'] = el['#text']
						break;
					case 'Tehnologija tiskanja':
						attributes['Tehnologija tiska'] = el['#text']
						if (el['#text'].includes('barvni')) {
							attributes['Barva tiska'] = 'Barvni'
						}
						break;
					case 'Največja ločljivost tiskanja':
						attributes['Ločljivost tiska'] = el['#text']
						break;
					case 'Možnosti povezave':
						attributes['Povezava tiskalnika'] = 'Brezžična'
						break;
					case 'Velikost medija':
						attributes['Format'] = el['#text']
					default:
						attributes[el['@_name']] = el['#text']
						break;
				}
			})
		}
		if (this.category === 'Potrošni material') {
			this.attribute.forEach((el) => {
				switch(el['@_name']) {
					case 'Vrsta kartuše':
					case 'Kompleti':
						attributes['Vrsta'] = 'Kartuša'
						break;
					case 'Format papirja':
						attributes['Vrsta'] = 'Papir'
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			})
		}
		if (this.category === 'Televizije') {
			this.attribute.forEach((el) => {
				switch(el['@_name']) {
					case 'Peron':
						attributes['Smart TV'] = 'Da';
						attributes['Operacijski sistem'] = el['#text']
						break;
					case 'Resolucija':
						attributes['Ločljivost'] = el['#text']
						break;
					case 'Velikost diagonale':
							attributes['Diagonala'] = el['#text']
						break;
					case 'Vrsta izdelka':
						attributes['Vrsta Zaslona'] = el['#text']
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			})
		}
		if (this.category === 'Domači kino') {
			this.attribute.forEach((el) => {
				switch(el['@_name']) {
					case 'Neprekinjena moč':
						attributes['Moč'] = el['#text']
						break;
					case 'Vmesniki':
						attributes['Povezljivost'] = el['#text']
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			})
		}
		if (this.category === 'Projektorji') {
			this.attribute.forEach((el) => {
				switch(el['@_name']) {
					case 'Opis izdleka':
						if(el['#text'].includes('prenosni')) {
							attributes['Name'] = 'Prenosni'
						} else {
							attributes['Name'] = 'Stacionarni'
						}
						break;
					case 'Resolucija':
						attributes['Ločljivost'] = el['#text']
						break;
					case 'Svetlost (bela)':
						attributes['Svetilnost'] = el['#text']
						break;
					case 'Razmerje kontrasta':
						attributes['Kontrast'] = el['#text']
						break;
					case 'Vrsta naprave':
						attributes['Tehnologija'] = el['#text']
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			})
		}
		if (this.category === 'Brezprekinitveni napajalniki') {
			this.attribute.forEach((el) => {
				switch (el['@_name']) {
					case 'Vrsta naprave':
						attributes['Postavitev'] = el['#text'];
						break;
					case 'Zmogljivost napajanja':
						attributes['Moč'] = el['#text'];
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			});
		}
		if (this.category === 'Dodatki za prenosnike') {
			this.attribute.forEach((el) => {
				switch (el['@_name']) {
					case 'Vrsta izdelka':
						attributes['Vrsta dodatka'] = el['#text'];
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			});
		}
		if (this.category === 'Grafične kartice') {
			this.attribute.forEach((el) => {
				switch (el['@_name']) {
					case 'Grafični motor':
						attributes['GPU'] = el['#text'];
						break;
					case 'Grafični motor':
						attributes['Grafični procesor'] = el['#text'];
						break;
					case 'Delovni spomin':
						attributes['Pomnilnik'] = el['#text'];
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			});
		}
		if (this.category === 'HI-FI in prenosni zvočniki') {
			this.attribute.forEach((el) => {
				switch (el['@_name']) {
					case 'Vrsta izdelka':
						attributes['Vrsta'] = el['#text'];
						break;
					case 'Ojačevalnik':
						attributes['Moč'] = el['#text'];
						break;
					case 'Povezljivost':
						attributes['Vmesniki'] = el['#text'];
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			});
		}
		if (this.category === 'Hlajenje') {
			this.attribute.forEach((el) => {
				switch (el['@_name']) {
					case 'Vrsta izdelka':
						attributes['Vrsta hlajenja'] = el['#text'];
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			});
		}
		if (this.category === 'Miške') {
			this.attribute.forEach((el) => {
				switch (el['@_name']) {
					case 'Vrsta izdelka':
						attributes['Vrsta miške'] = el['#text'];
						break;
					case 'Tehnologija povezljivosti':
						attributes['Povezava'] = el['#text'];
						break;
					case 'Tehnologija zaznavanja gibanja':
						attributes['Senzor'] = el['#text'];
						break;
					case 'Ločljivost premikanja':
						attributes['DPI'] = el['#text'];
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			});
		}
		if (this.category === 'Igralni pripomočki') {
			this.attribute.forEach((el) => {
				switch (el['@_name']) {
					case 'Vrsta izdelka':
						attributes['Vrsta pripomočka'] = el['#text'];
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			});
		}
		if (this.category === 'Kompleti') {
			this.attribute.forEach((el) => {
				switch (el['@_name']) {
					case 'Tehnologija povezljivosti':
						attributes['Povezava'] = el['#text'];
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			});
		}
		if (this.category === 'Mrežne kartice, antene, WIFI ojačevalci') {
			this.attribute.forEach((el) => {
				switch (el['@_name']) {
					case 'Vrsta naprave':
						attributes['Vrsta'] = el['#text'];
						break;
					case 'Stopnja prenosa podatkov':
					case 'OVEN':
						attributes['Hitrost'] = el['#text'];
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			});
		}
		if (this.category === 'Napajalniki') {
			this.attribute.forEach((el) => {
				switch (el['@_name']) {
					case 'Zmogljivost napajanja':
						attributes['Moč'] = el['#text'].replace(/vatov?/i, 'W').replace(/\s+W/, ' W');
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			});
		}
		if (this.category === 'Optične enote') {
			this.attribute.forEach((el) => {
				switch (el['@_name']) {
					case 'Vrsta naprave':
						attributes['Vrsta optične enote'] = el['#text'];
						break;
					case 'Optično shranjevanje':
						attributes['Tip optične enote'] = el['#text'];
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			});
		}
		if (this.category === 'Optični bralniki') {
			this.attribute.forEach((el) => {
				switch (el['@_name']) {
					case 'Vrsta senzorja za skeniranje':
						attributes['Tip bralnika'] = el['#text'];
						break;
					case '/':
						attributes['Hitrost branja'] = el['#text'];
						break;
					case 'Vrsta naprave':
						attributes['Povezava'] = el['#text'];
						break;
					case 'Vrsta vmesnika':
						attributes['Duplex'] = el['#text'];
						break;
					case 'Največja podprta velikost dokumenta':
						attributes['Format'] = el['#text'];
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			});
		}
		if (this.category === 'Osnovne plošče') {
			this.attribute.forEach((el) => {
				switch (el['@_name']) {
					case 'Združljivi procesorji':
						attributes['Vrsta procesorja'] = el['#text'];
						break;
					case 'Vrsta čipov':
						attributes['Podnožje'] = el['#text'];
						break;
					case 'Vrsta izdelka':
						attributes['Format'] = el['#text'];
						break;
					case 'Procesorska vtičnica':
						attributes['Vezni nabor'] = el['#text'];
						break;
					case 'RAM podprt':
						attributes['Pomnilniške reže'] = el['#text'];
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			});
		}
		if (this.category === 'Procesorji') {
			this.attribute.forEach((el) => {
				switch (el['@_name']) {
					case 'Vrsta procesorja':
						attributes['Procesor'] = el['#text'];
						break;
					case 'Združljiva procesorska vtičnica':
						attributes['Podnožje'] = el['#text'];
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			});
		}
		if (this.category === 'Slušalke') {
			this.attribute.forEach((el) => {
				switch (el['@_name']) {
					case '':
						attributes['Tehnologija povezljivosti'] = el['#text'];
						break;
					case 'Mikrofon':
						attributes['Mikrofon'] = 'da';
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			});
		}
		if (this.category === 'Spletne kamere') {
			this.attribute.forEach((el) => {
				switch (el['@_name']) {
					case 'Največja ločljivost':
						attributes['Ločljivost'] = el['#text'];
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			});
		}
		if (this.category === 'Strežniki') {
			this.attribute.forEach((el) => {
				switch (el['@_name']) {
					case 'Vrsta':
						attributes['Postavitev'] = el['#text'];
						break;
					case 'Procesor':
						attributes['Procesor'] = el['#text'];
						break;
					case 'Trdi disk':
						attributes['Kapaciteta diska'] = el['#text'];
						break;
					case 'OVEN':
						attributes['Kapaciteta pomnilnika'] = el['#text'];
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			});
		}
		if (this.category === 'Tipkovnice') {
			this.attribute.forEach((el) => {
				switch (el['@_name']) {
					case 'Tehnologija povezljivosti':
						attributes['Povezava'] = el['#text'];
						break;
					case '/':
						attributes['Mehanska'] = el['#text'];
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			});
		}
		if (this.category === 'USB ključki') {
			this.attribute.forEach((el) => {
				switch (el['@_name']) {
					case 'Prostor za shrambo':
						attributes['Kapaciteta'] = el['#text'];
						break;
					case 'Vrsta vmesnika':
						attributes['Priključek'] = el['#text'];
						break;
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			});
		}
		if (this.category === 'Usmerjevalniki, stikala in AP') {
			this.attribute.forEach((el) => {
				switch (el['@_name']) {
					case 'Vrsta naprave':
						attributes['Vrsta'] = el['#text'];
						break;
					case 'Zmogljivost':
						attributes['Hitrost'] = el['#text'];
						break;
					case 'Pristanišča':
						attributes['Št. LAN priklopov']
					default:
						attributes[el['@_name']] = el ['#text'];
						break;
				}
			});
		}
		return attributes;
	}
}