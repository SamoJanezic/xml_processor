export class AsbisAttributes {
	constructor(category, attribute) {
		this.category = category;
		this.attribute = attribute;
	}

	formatAttributes() {
		let match;
		const attributes = {};
		if(!this.attribute || !this.attribute.length) {
			return null;
		}


		if (this.category === 'Dodatki za prenosnike') {
			this.attribute.forEach((el) => {
				switch(el['@_Name']) {
					case 'Vrsta torbe':
						attributes['Vrsta dodatka'] = 'Torba za prenosnike';
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Monitorji') {
			this.attribute.forEach((el) => {
				switch(el['@_Name']) {
					case 'Najvišja ločljivost':
						attributes['Ločljivost'] = el['@_Value']
						break;
					case 'Dolžina diagonale':
						attributes['Velikost zaslona'] = el['@_Value']
						break;
					case 'Vrsta matrike':
						attributes['Matrika'] = el['@_Value']
						break;
					case 'Najvišja frekvenca osveževanja pri najvišji ločljivosti':
						attributes['Osveževanje'] = el['@_Value'].replace(' ','')
						break;
					case 'Vrsta oblike zvočnika':
						attributes['Zvočniki'] = 'Da';
						break;
					case 'Značilnosti zaslona':
						if( el['@_Value'].includes('Ukrivljena')) {
							attributes['Ukrivljen zaslon'] = 'Da';
						}
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Procesorji') {
			this.attribute.forEach((el) => {
				switch(el['@_Name']) {
					case 'Procesor':
						attributes['Procesor'] = el['@_Value'];
						break;
					case 'Ležišče':
						attributes['Podnožje'] = el['@_Value'];
						break;

				}
			})
		}
		if (this.category === 'Pomnilniki') {
			this.attribute.forEach((el) => {
				switch(el['@_Name']) {
					case 'Zmogljivost pomnilnika':
						attributes['Kapaciteta pomnilnika'] = el['@_Value']
						break;
					case 'Tehnologija pomnilnika':
						attributes['Vrsta pomnilnika'] = el['@_Value']
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Trdi diski') {
			this.attribute.forEach((el) => {
				switch(el['@_Name']) {
					case 'Zmogljivost pomnilnika':
						attributes['Kapaciteta diska'] = el['@_Value']
						break;
					case 'Lokacija naprave':
						attributes['Vrsta diska'] = el['@_Value']
						break;
					case 'Format diska':
						attributes['Tip diska'] = el['@_Value']
						break;
					case 'Podprti podatkovni kanal':
						attributes['Vmesnik'] = el['@_Value']
						break;
					case 'Tip':
						match = el['@_Value'].match(/\d+(\.\d+)?"/);
						if (match) {
							attributes['Velikost diska'] = match[0]
						}
					default:
						break;
				}
			})
		}
		if (this.category === 'Grafične kartice') {
			this.attribute.forEach((el) => {
				switch(el['@_Name']) {
					case 'Nabor grafičnih čipov':
						attributes['Grafični procesor'] = el['@_Value'];
						break;
					case 'Zmogljivost vgrajenega video pomnilnika':
						attributes['Kapaciteta pomnilnika'] = el['@_Value'];
						break;
					case 'Vrsta pomnilnika':
						attributes['Vrsta pomnilnika'] = el['@_Value'];
						break;
					default:
						break;
				}
			});
		}
		if (this.category === 'Osnovne plošče') {
			this.attribute.forEach((el) => {
				switch(el['@_Name']) {
					case 'Podprti procesorji':
						attributes['Vrsta procesorja'] = el['@_Value'].replaceAll(' <br/>', ', ');
						break;
					case 'Nabor čipov':
						attributes['Vezni nabor'] = el['@_Value'];
						break;
					case 'Tip':
						attributes['Format'] = el['@_Value'];
						break;
					case 'Standardi ležišča procesorja':
						attributes['Podnožje'] = el['@_Value'];
						break;
					case 'Število pomnilniških rež':
						attributes['Pomnilniške reže'] = el['@_Value'];
						break;
					default:
						break;
				}
			});
		}
		if (this.category === 'HI-FI in prenosni zvočniki') {
			this.attribute.forEach((el) => {
				switch(el['@_Name']) {
					case 'Vrsta sistema':
						if (el['@_Value'] === 'Portable Speaker') {
							attributes['Vrsta zvočnika'] = 'Prenosni zvočnik';
						} else if (el['@_Value'] === 'PC Speaker') {
							attributes['Vrsta zvočnika'] = 'Računalniški zvočnik';
						}
						break;
					case 'Izhodna moč':
						attributes['Moč'] = el['@_Value'];
						break;
					case 'Vrsta napajalnih konektorjev':
						attributes['Priključki'] = el['@_Value'];
						break;
					default:
						break;
				}
			});
		}
		if (this.category === 'NAS sistemi') {
			this.attribute.forEach((el) => {
				switch(el['@_Name']) {
					case 'Tip':
						attributes['Postavitev'] = el['@_Value'];
						break;
					case 'Podprto Število naprav':
						attributes['Kapaciteta'] = el['@_Value'];
						break;
					case 'Vmesniki':
						attributes['št. LAN priklopov'] = el['@_Value'].match(/LAN:\s*(\d+x)/i)[1];
						break;
					case 'Število razširitvenih mest za 3,5-palčni pogons podporo zamenjave med delovanjem':
						attributes['Število diskov'] = el['@_Value'];
						break;
					default:
						break;
				}
			});
		}
		if (this.category === 'Slušalke') {
			this.attribute.forEach((el) => {
				switch(el['@_Name']) {
					case 'Brezžična tehnologija':
						attributes['Povezava'] = 'Brezžične';
						break;
					case 'Tip mikrofona':
						attributes['Mikrofon'] = 'Da';
						break;
					default:
						if (!attributes['Povezava']) {
							attributes['Povezava'] = 'Žične';
						}
						break;
				}
			});
		}
		if (this.category === 'Spletne kamere') {
			this.attribute.forEach((el) => {
				switch(el['@_Name']) {
					case 'Največja ločljivost videa':
						attributes['Ločljivost'] = el['@_Value'];
						break;
					default:
						break;
				}
			});
		}
		if(this.category === 'Usmerjevalniki, stikala in AP') {
			this.attribute.forEach((el) => {
				switch(el['@_Name']) {
					case 'Vrsta':
						attributes['Vrsta'] = el['@_Value'];
						break;
					case 'Wi-Fi Band Frequency':
					case 'Hitrost prenosa podatkov':
						attributes['Hitrost'] = el['@_Value'];
						break;
					case 'LAN':
						attributes['št. LAN priklopov'] = el['@_Value'];
						break;
					default:
						break;
				}
			});
		}
		if (this.category === 'Televizije') {
			this.attribute.forEach((el) => {
				switch (el['@_Name']) {
					case 'Dolžina diagonale':
						attributes['Diagonala'] = el['@_Value'];
						break;
					case 'Najvišja ločljivost':
						attributes['Ločljivost'] = el['@_Value'];
						attributes['Smart TV'] = 'Da';
						attributes['Operacijski sistem'] = 'Android';
						break;
					case 'Vrsta zaslona':
						attributes['Vrsta zaslona'] = el['@_Value'];
						break;
					default:
						break;
				}
			});
		}
		if (this.category === 'Optične enote') {
			this.attribute.forEach((el) => {
				switch (el['@_Name']) {
					case 'Vrsta diskovnega pogona':
						attributes['Vrsta'] = el['@_Value'];
						break;
					case 'Lokacija naprave':
						attributes['Tip'] = el['@_Value'];
						break;
					default:
						break;
				}
			});
		}
		if(this.category === 'Ohišja') {
			this.attribute.forEach((el) => {
				switch(el['@_Name']) {
					case 'Tip matične plošče':
						attributes['Velikost'] = el['@_Value'];
						break;
					case 'Vrsta napajalnika':
						attributes['Napajalnik'] = el['@_Value'];
						break;
					default:
						break;
				}
			});
		}
		if (this.category === 'Tipkovnice') {
			this.attribute.forEach((el) => {
				switch (el['@_Name']) {
					case 'Tehnologija povezovanja':
						attributes['Povezava'] = el['@_Value'];
						break;
					case 'Vrsta tipk':
						if (el['@_Value'] === 'Mechanical') {
							attributes['Mehanska'] = 'Da';
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