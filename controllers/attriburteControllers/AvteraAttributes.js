export class AvteraAttributes {
	constructor(category, attribute) {
		this.category = category;
		this.attribute = attribute;
	}

	formatAttributes() {
		let match;
		const attributes = {};
		if(!this.attribute || !this.attribute.lastnost.length) {
			return null;
		}


		if (this.category === 'Prenosniki') {
			this.attribute.lastnost.forEach((el) => {
				switch(el['@_naziv']) {
					case 'Vrsta procesorja':
						attributes['Procesor'] = el['#text']
						break;
					case 'Grafična kartica dodatno':
						attributes['Grafična kartica'] = el['#text']
						break;
					case 'Tip prenosnika':
						attributes['Namen uporabe'] = el['#text']
						break;
					case 'Diagonala zaslona':
						match = el['#text'].match(/\((\d+(?:,\d+)?)"\)/);
						if (match) {
							attributes['Velikost zaslona'] = `${match[1].replace(',', '.').replace('.0', '')}\"`; // Normalize to decimal format
						}
						break;
					case 'Diagonala zaslona dodatno':
						match = el['#text'].match(/\b\d{3,4}\s?[×x]\s?\d{3,4}\b/i)
						if (match) {
							attributes['Ločljivost'] = match[0].replace('×', 'x').replaceAll(' ', '')
						} else {
							break;
						}
						break;
					case 'Velikost pomnilnika':
						attributes['Kapaciteta pomnilnika'] = el['#text']
						break;
					case 'SSD pogon':
						attributes['Kapaciteta diska'] = el['#text']
						break;
					case 'Operacijski sistem':
						attributes['Operacijski sistem'] = el['#text']
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Monitorji') {
			this.attribute.lastnost.forEach((el) => {
				switch(el['@_naziv']) {
					case 'Ločljivost':
						match = el['#text'].match(/\b\d{3,4}\s?[×x]\s?\d{3,4}\b/i)
						if (match) {
							attributes['Ločljivost'] = match[0].replace('×', 'x').replaceAll(' ', '')
						} else {
							break;
						}
						break;
					case 'Diagonala zaslona':
						match = el['#text'].match(/\((\d+(?:,\d+)?)["”']?('')?\)/);
						if (match) {
							attributes['Velikost zaslona'] = `${match[1].replace(',', '.').replace('.0', '')}\"`; // Normalize to decimal format
						}
						break;
					case 'Tip matrike':
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
					case 'Priključki':
						attributes['Vhodi'] = el['#text']
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'AIO') {
			this.attribute.lastnost.forEach((el) => {
				switch(el['@_naziv']) {
					case 'Vrsta procesorja':
						attributes['Procesor'] = el['#text']
						break;
					case 'Grafična kartica dodatno':
						attributes['Grafična kartica'] = el['#text']
						break;
					case 'Zaslon na dotik':
						if (el['#text'] === 'Da') {
							attributes['Vrsta zaslona'] = 'Da'
						}
						break;
					case 'Diagonala zaslona':
						match = el['#text'].match(/\((\d+(?:,\d+)?)['"]\)/);
						if (match) {
							attributes['Velikost zaslona'] = `${match[1].replace(',', '.').replace('.0', '')}\"`; // Normalize to decimal format
						}
						break;
					case 'Diagonala zaslona dodatno':
						match = el['#text'].match(/\b\d{3,4}\s?[×x]\s?\d{3,4}\b/i)
						if (match) {
							attributes['Ločljivost'] = match[0].replace('×', 'x').replaceAll(' ', '')
						}
						break;
					case 'Velikost pomnilnika':
						attributes['Kapaciteta pomnilnika'] = el['#text']
						break;
					case 'SSD pogon':
						attributes['Kapaciteta diska'] = el['#text']
						break;
					case 'Operacijski sistem':
						attributes['Operacijski sistem'] = el['#text']
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Namizni računalniki') {
			this.attribute.lastnost.forEach((el) => {
				switch(el['@_naziv']) {
					case 'Vrsta procesorja':
						attributes['Procesor'] = el['#text']
						break;
					case 'Grafična kartica dodatno':
						attributes['Grafična kartica'] = el['#text']
						break;
					case 'Velikost pomnilnika':
						attributes['Kapaciteta pomnilnika'] = el['#text']
						break;
					case 'SSD pogon':
						attributes['Kapaciteta diska'] = el['#text']
						break;
					case 'Operacijski sistem':
						attributes['Operacijski sistem'] = el['#text']
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Tablični računalniki') {
			this.attribute.lastnost.forEach((el) => {
				switch(el['@_naziv']) {
					case 'Vrsta procesorja':
						attributes['Procesor'] = el['#text']
						break;
					case 'Diagonala zaslona':
						match = el['#text'].match(/\((\d+(?:,\d+)?)["”']?('')?\)/);
						if (match) {
							attributes['Velikost zaslona'] = `${match[1].replace(',', '.').replace('.0', '')}\"`; // Normalize to decimal format
						}
						break;
					case 'Diagonala zaslona dodatno':
						match = el['#text'].match(/\b\d{3,4}\s?[×x]\s?\d{3,4}\b/i)
						if (match) {
							attributes['Ločljivost'] = match[0].replace('×', 'x').replaceAll(' ', '')
						}
						break;
					case 'Pomnilnik RAM':
						attributes['Kapaciteta pomnilnika'] = el['#text']
						break;
					case 'Pomnilnik FLASH':
						attributes['Kapaciteta diska'] = el['#text']
						break;
					case 'Operacijski sistem':
						attributes['Operacijski sistem'] = el['#text']
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Pomnilniki') {
			this.attribute.lastnost.forEach((el) => {
				switch(el['@_naziv']) {
					case 'Velikost pomnilnika':
						attributes['Kapaciteta pomnilnika'] = el['#text'].replace(' ','')
						break;
					case 'Vrsta pomnilnika':
						attributes['Vrsta pomnilnika'] = el['#text']
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Trdi diski') {
			this.attribute.lastnost.forEach((el) => {
				switch(el['@_naziv']) {
					case 'Kapaciteta dodatno':
						attributes['Kapaciteta diska'] = el['#text']
							.replace(',', '.')
							.replace(/(\d+(\.\d+)?)([A-Z]+)/, '$1 $3');
						break;
					case 'Vrsta diska':
						attributes['Vrsta diska'] = el['#text']
						break;
					case 'Format diska':
						attributes['Tip diska'] = el['#text']
						break;
					case 'Vmesnik (priklop)':
						attributes['Vmesnik'] = el['#text']
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Tiskalniki') {
			this.attribute.lastnost.forEach((el) => {
				switch(el['@_naziv']) {
					case 'Ločljivost tiskanja':
						attributes['Ločljivost tiska'] = el['#text']
						break;
					case 'Tehnologija tiskanja':
						attributes['Tehnologija tiska'] = el['#text']
						break;
					case 'Hitrost tiskanja':
						attributes['Hitrost tiskanja'] = el['#text']
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Potrošni material') {
			this.attribute.lastnost.forEach((el) => {
				switch(el['@_naziv']) {
					case 'Vrsta kartuše':
					case 'Kompleti':
						attributes['Vrsta'] = 'Kartuša'
						break;
					case 'Format papirja':
						attributes['Vrsta'] = 'Papir'
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Televizije') {
			this.attribute.lastnost.forEach((el) => {
				switch(el['@_naziv']) {
					case 'Smart TV':
						attributes['Smart TV'] = 'Da';
						attributes['Operacijski sistem'] = el['#text']
						break;
					case 'Ločljivost zaslona':
						match = el['#text'].match(/\b\d{3,4}\s?[×x]\s?\d{3,4}\b/i)
						if (match) {
							attributes['Ločljivost'] = match[0].replace('×', 'x').replaceAll(' ', '')
						} else {
							break;
						}
						break;
					case 'Diagonala zaslona':
						match = el['#text'].match(/\((\d+(?:,\d+)?)["”']?('')?\)/);
						if (match) {
							attributes['Diagonala'] = `${match[1].replace(',', '.').replace('.0', '')}\"`; // Normalize to decimal format
						}
						break;
					case 'Tip  zaslona':
						attributes['Vrsta Zaslona'] = el['#text']
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Domači kino') {
			this.attribute.lastnost.forEach((el) => {
				switch(el['@_naziv']) {
					case 'Izhodna moč zvočnika':
						attributes['Moč'] = el['#text']
						break;
					case 'Povezave':
						attributes['Priključki'] = el['#text']
						break;
					case 'Tip  zaslona':
						attributes['Vrsta Zaslona'] = el['#text']
						break;
					case 'Zvočni sistem':
						attributes['Zvočni sistem'] = el['#text']
						break;
					case 'Globokotonski zvočnik':
						attributes['Globokotonski zvočnik'] = el['#text']
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Projektorji') {
			this.attribute.lastnost.forEach((el) => {
				switch(el['@_naziv']) {
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
		if (this.category === 'Pralni stroji') {
			this.attribute.lastnost.forEach((el) => {
				switch (el['@_naziv']) {
					case 'Zmogljivost pranja':
						attributes['Kapaciteta'] = el['#text'];
						break;
					case 'Razred energijske učinkovitosti pranja':
						attributes['Energijski razred'] = el['#text'];
						break;
					case 'Največja hitrost ožemanja':
						attributes['št. Obratov centrifuge'] = el['#text'];
						break;
					case 'Inverter motor':
						attributes['Inverter motor'] = el['#text'];
						break;
					default:
						break;
				}
			});
		}
		if (this.category === 'Sušilni stroji') {
			this.attribute.lastnost.forEach((el) => {
				switch (el['@_naziv']) {
					case 'Zmogljivost sušenja':
						attributes['Kapaciteta'] = el['#text'];
						break;
					case 'Razred energijske učinkovitosti sušenja':
						attributes['Energijski razred'] = el['#text'];
						break;
					case 'Toplotna črpalka':
						attributes['Toplotna črpalka'] = el['#text'];
						break;
					case 'Inverter motor':
						attributes['Inverter motor'] = el['#text'];
						break;
					default:
						break;
				}
			});
		}
		if (this.category === 'Pralno-sušilni stroji') {
			this.attribute.lastnost.forEach((el) => {
				switch (el['@_naziv']) {
					case 'Zmogljivost pranja':
						attributes['Kapaciteta pranja'] = el['#text'];
						break;
					case 'Zmogljivost sušenja':
						attributes['Kapaciteta sušenja'] = el['#text'];
						break;
					case 'Razred energijske učinkovitosti pranja in sušenja':
						attributes['Energijski razred pranja'] = el['#text'];
						break;
					case 'Inverter motor':
						attributes['Inverter motor'] = el['#text'];
						break;
					case 'Največja hitrost ožemanja':
						attributes['Centrifuga'] = el['#text'];
						break;
					default:
						break;
				}
			});
		}
		if (this.category === 'Pomivalni stroji') {
			this.attribute.lastnost.forEach((el) => {
				switch (el['@_naziv']) {
					case 'Mere (Š x V x G)':
						const dimenzije = el['#text'].match(/\d+/g);
						if (dimenzije) {
							attributes['Širina'] = dimenzije[0];
							attributes['Višina'] = dimenzije[1];
						}
						break;
					case 'Namestitev':
						attributes['Tip'] = el['#text'];
						break;
					case 'Število pogrinjkov':
						attributes['Število pogrinjkov'] = el['#text'];
						break;
					case 'Zaščita pred izlivom vode':
						attributes['Aqua stop'] = 'Da';
						break;
					case 'Zlaganje pribora':
						if(el['#text'] === 'Predal') {
							attributes['Tretja košara'] = 'Da';
						}
					case 'Energetski razred':
						attributes['Energijski razred'] = el['#text'];
						break;
					default:
						break;
				}
			});
		}
		if (this.category === 'Hladilniki') {
			this.attribute.lastnost.forEach((el) => {
				switch (el['@_naziv']) {
					case 'Vrsta hladilnika':
						attributes['Vrsta'] = el['#text'];
						break;
					case 'Energetski razred':
						attributes['Energijski razred'] = el['#text'];
						break;
					case 'Položaj zamrzovalnika':
						attributes['Položaj zamrzovalnika'] = el['#text'];
						break;
					case 'Samodejno odtajevanje':
						attributes['No frost'] = el['#text'];
						break;
					case 'Višina dodatno':
						attributes['Višina'] = el['#text'];
						break;
					default:
						break;
				}
			});
		}
		if (this.category ==='Zamrzovalniki') {
			this.attribute.lastnost.forEach((el) => {
				switch (el['@_naziv']) {
					case 'Vrsta zmrzovalne skrinje':
						attributes['Vrsta'] = el['#text'];
						break;
					case 'Energetski razred':
						attributes['Energijski razred'] = el['#text'];
						break;
					case 'Samodejno odtajevanje':
						attributes['No frost'] = el['#text'];
						break;
					case 'Višina dodatno':
						attributes['Višina'] = el['#text'];
						break;
					case 'Prostornina zmrzovalnika dodatno':
						attributes['Prostornina zmrzovalnika'] = el['#text']
						break;
					case 'Mere (Š x V x G)':
						const dimenzije = el['#text'].match(/\d+/g);
						if (dimenzije) {
							attributes['Širina'] = dimenzije[0];
							attributes['Višina'] = dimenzije[1];
						}
						break;
					default:
						break;
				}
			});
		}
		if (this.category === 'Pečice') {
			this.attribute.lastnost.forEach((el) => {
				switch (el['@_naziv']) {
					case 'Namestitev':
						attributes['Tip'] = el['#text'];
						break;
					case 'Energetski razred':
						attributes['Energijski razred'] = el['#text'];
						break;
					case 'Prostornina pečice dodatno':
						attributes['Prostornina'] = el['#text'];
						break;
					case 'Mere (Š x V x G)':
						const dimenzije = el['#text'].match(/\d+/g);
						if (dimenzije) {
							attributes['Višina'] = dimenzije[1];
						}
						break;
					case 'Način čiščenja':
						attributes['Način čiščenja'] = el['#text'];
						break;
					default:
						break;
				}
			});
		}
		if (this.category === 'Kuhališča') {
			this.attribute.lastnost.forEach((el) => {
				switch (el['@_naziv']) {
					case 'Namestitev kuhalne plošče':
						attributes['Tip'] = el['#text'];
						break;
					case 'Število kuhališč':
						attributes['Število kuhališč'] = el['#text'];
						break;
					case 'Vrsta kuhalne plošče':
						attributes['Vrsta kuhalne plošče'] = el['#text'];
						break;
					case 'Širina dodatno':
						attributes['Širina'] = el['#text'];
						break;
					default:
						break;
				}
			});
		}
		if (this.category === 'Nape') {
			this.attribute.lastnost.forEach((el) => {
				switch (el['@_naziv']) {
					case 'Energetski razred':
						attributes['Energijski razred'] = el['#text'];
						break;
					case 'Vrsta nape':
						attributes['Tip'] = el['#text'];
						break;
					case 'Mere (Š x V x G)':
						const dimenzije = el['#text'].match(/\d+/g);
						if (dimenzije) {
							attributes['Širina'] = dimenzije[0];
						}
						break;
					default:
						break;
				}
			});
		}
		return attributes;
	}
}