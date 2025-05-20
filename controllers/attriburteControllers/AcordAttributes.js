export class AcordAttributes {
	constructor(category, attribute) {
		this.attribute = attribute;
		this.category = category;
	}

	formatAttributes() {
		let match;
		const attributes= [];
		if (this.category === 'Prenosniki') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'procesor':
						attributes.push({"Procesor": el['#text']});
						break;
					case 'pomnilnik':
						match = el['#text'].match(/(\d+)\s?(GB|TB)/i);
						attributes.push({"Kapaciteta pomnilnika": `${match[1]} ${match[2]}`});
						break;
					case 'zaslon':
						attributes.push({"Velikost zaslona": el['#text'].match(/^\d+(\.\d+)?/) ? el['#text'].match(/^\d+(\.\d+)?/)[0] + '\"' : el['#text']});
						attributes.push({"Ločljivost": el['#text'].match(/\b\d{3,4}\s?x\s?\d{3,4}\b/i)[0]});
						break;
					case 'trdi_disk':
						match = el['#text'].match(/(\d+)\s?(GB|TB)/i);
						attributes.push({"Kapaciteta diska": `${match[1]} ${match[2]}`});
						break;
					case 'graficna_kartica':
						attributes.push({"Grafična kartica": el['#text']});
						break;
					case 'operacijski_sistem_filter':
					case 'operacijski_sistem':
						attributes.push({"Operacijski sistem": el['#text']});
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'AIO') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'procesor':
						attributes.push({"Procesor": el['#text']});
						break;
					case 'pomnilnik':
						match = el['#text'].match(/(\d+)\s?(GB|TB)/i);
						attributes.push({"Kapaciteta pomnilnika": `${match[1]} ${match[2]}`});
						break;
					case 'zaslon':
						attributes.push({"Velikost zaslona": el['#text'].match(/^\d+(\.\d+)?/) ? el['#text'].match(/^\d+(\.\d+)?/)[0] + '\"' : el['#text']});
						attributes.push({"Ločljivost": el['#text'].match(/\b\d{3,4}\s?x\s?\d{3,4}\b/i)[0]});
						break;
					case 'trdi_disk':
						match = el['#text'].match(/(\d+)\s?(GB|TB)/i);
						attributes.push({"Kapaciteta diska": `${match[1]} ${match[2]}`});
						break;
					case 'graficna_kartica':
						attributes.push({"Grafična kartica": el['#text']});
						break;
					case 'operacijski_sistem':
						attributes.push({"Operacijski sistem": el['#text']});
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Računalniki') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'procesor':
						attributes.push({"Procesor": el['#text']});
						break;
					case 'pomnilnik':
						match = el['#text'].match(/(\d+)\s?(GB|TB)/i);
						if (match){
							attributes.push({"Kapaciteta pomnilnika": `${match[1]} ${match[2]}`});
						} else {
							attributes.push({"Kapaciteta pomnilnika": el['#text']});
						}
						break;
					case 'trdi_disk':
						match = el['#text'].match(/(\d+)\s?(GB|TB)/i);
						attributes.push({"Kapaciteta diska": `${match[1]} ${match[2]}`});
						break;
					case 'graficna_kartica':
						attributes.push({"Grafična kartica": el['#text']});
						break;
					case 'operacijski_sistem':
						attributes.push({"Operacijski sistem": el['#text']});
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Mini') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'procesor':
						attributes.push({"Procesor": el['#text']});
						break;
					case 'pomnilnik':
						match = el['#text'].match(/(\d+)\s?(GB|TB)/i);
						if (match){
							attributes.push({"Kapaciteta pomnilnika": `${match[1]} ${match[2]}`});
						} else {
							attributes.push({"Kapaciteta pomnilnika": el['#text']});
						}
						break;
					case 'trdi_disk':
						match = el['#text'].match(/(\d+)\s?(GB|TB)/i);
						if (el['#text'].includes('možnost')){
							attributes.push({"Kapaciteta diska": "brez"});

						} else if (match){
							attributes.push({"Kapaciteta diska": `${match[1]} ${match[2]}`});
						} else {
							attributes.push({"Kapaciteta diska": el['#text']});
						}
						break;
					case 'graficna_kartica':
						attributes.push({"Grafična kartica": el['#text']});
						break;
					case 'operacijski_sistem':
						attributes.push({"Operacijski sistem": el['#text']});
						break;
					default:
						break;
				}
			})
		
		}
		if (this.category === 'Tablični računalniki') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'procesor':
						attributes.push({"Procesor": el['#text']});
						break;
					case 'pomnilnik':
						match = el['#text'].match(/(\d+)\s?(GB|TB)/i);
						attributes.push({"Kapaciteta pomnilnika": `${match[1]} ${match[2]}`});
						break;
					case 'zaslon':
						attributes.push({"Velikost zaslona": el['#text'].match(/^\d+(\.\d+)?/) ? el['#text'].match(/^\d+(\.\d+)?/)[0] + '\"' : el['#text']});
						attributes.push({"Ločljivost": el['#text'].match(/\b\d{3,4}\s?x\s?\d{3,4}\b/i)[0].replace(/\s?x\s?/i, ' x ')});
						break;
					case 'trdi_disk':
						match = el['#text'].match(/(\d+)\s?(GB|TB)/i);
						attributes.push({"Kapaciteta diska": `${match[1]} ${match[2]}`});
						break;
					case 'graficna_kartica':
						attributes.push({"Grafična kartica": el['#text']});
						break;
					case 'operacijski_sistem':
						attributes.push({"Operacijski sistem": el['#text']});
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'NAS') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'sto_procesor':
						attributes.push({"Procesor": el['#text']});
						break;
					case 'tip_sto':
						attributes.push({"Postavitev": el['#text']});
						break;
					case 'sto_pomnilnik':
						match = el['#text'].match(/(\d+)\s?(GB|TB)/i);
						attributes.push({"Kapaciteta pomnilnika": `${match[1]} ${match[2]}`});
						break;
					case 'sto_prikljucki':
						match = el['#text'].match(/\b\d+x\sRJ-?45\b/i);
						attributes.push({"št. LAN priklopov": `${match[0].replace('-','')}`});
						break;
					case 'sto_reze_za_diske':
						attributes.push({"Število diskov": el['#text']});
					default:
						break;
				}
			})
		}
		if (this.category === 'Monitorji') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'priklop':
						attributes.push({"Vhodi": el['#text']});
						break;
					case 'mon_frekvenca_tekst':
						attributes.push({"Osveževanje": el['#text']});
						break;
					case 'tip_matrike':
						attributes.push({"Matrika": el['#text']});
						break;
					case 'diagonala_zaslona':
						attributes.push({"Velikost zaslona": el['#text']})
						break;
					case 'optimalna_locljivost':
						attributes.push({"Ločljivost": el['#text']});
						break;
					case 'dodatno':
						if (el['#text'].includes('ukrivljenost')) {
							attributes.push({"Ukrivljenost": 'Da'});
						}
						break;
					case 'vgrajeni_zvocniki':
						attributes.push({"Zvočniki": el['#text']});
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Osnovne plošče') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'podnozje':
						attributes.push({"Podnožje": el['#text']});
						break;
					case 'vezni_nabor':
						attributes.push({"Vezni nabor": el['#text']});
						break;
					case 'format_filter_maticne':
						attributes.push({"Format": el['#text']});
						break;
					case 'pomnilnik':
						attributes.push({"Pomnilniške reže": el['#text']});
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Procesorji') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'tip_procesorja':
						attributes.push({"Procesor": el['#text']});
						break;
					case 'podnozje':
						attributes.push({"Podnožje": el['#text']});
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Pomnilniki') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'tip_ram':
						attributes.push({"Vrsta pomnilnika": el['#text']});
						break;
					case 'kapaciteta':
						attributes.push({"Kapaciteta pomnilnika": el['#text']});
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Trdi diski') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'tip_hdd':
						if (el['#text'] === 'No') {
							break;
						}
						attributes.push({"Vrsta diska": el['#text']});
						break;
					case 'kapaciteta_hdd_tekst':
						attributes.push({"Kapaciteta diska": el['#text']});
						break;
					case 'vmesnik':
						attributes.push({"Vmesnik": el['#text']});
						break;
					case 'format':
						if (el['#text'] === 'No') {
							break;
						}
						attributes.push({"Velikost diska": el['#text']});
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Ohišja') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'cas_tip':
						attributes.push({"Velikost": el['#text']});
						break;
					case 'napajalnik':
						attributes.push({"Napajalnik": el['#text']});
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Napajalniki') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'moc':
						attributes.push({"Moč": el['#text']});
						break;
					case 'pws_format_filter':
						attributes.push({"Format": el['#text']});
						break;
					case 'pws_napetosti_tokovi':
						attributes.push({"Modulani": el['#text']});
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Grafične kartice') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'proizvajalec_cipovja':
						attributes.push({"Proizvajalec čipovja": el['#text']});
						break;
					case 'graficni_procesor':
						attributes.push({"Grafični procesor": el['#text']});
						break;
					case 'graficni_pomnilnik':
						attributes.push({"Grafični pomnilnik": el['#text']});
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Hlajenje') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'namembnost':
						attributes.push({"Vrsta hlajenja": el['#text']});
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Tipkovnice') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'povezljivost':
						attributes.push({"Povezljivost": el['#text']});
						break;
					case 'drugo':
						if (el['#text'].includes('mehanske')) {
							attributes.push({"Mehanska": 'Da'});
						}
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Miške') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'povezljivost':
						attributes.push({"Povezljivost": el['#text']});
						break;
					case 'tip_mou':
						attributes.push({"Senzor": el['#text']});
						break;
					case 'mou_locljivost':
						attributes.push({"Ločljivost": el['#text']});
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Slušalke') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'heapho_povezljivost':
						attributes.push({"Povezava": el['#text']});
						break;
					case 'heapho_mikrofon':
						attributes.push({"Mikrofon": el['#text']});
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Usmerjevalniki, stikala in AP') {
			let keys;
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'netswi_namestitev':
						attributes.push({"Vrsta": 'Stikalo'});
						break;
					case 'netapo_postavitev_filter':
						attributes.push({"Vrsta": 'Dostopna točka'});
						break;
					case 'antena':
						attributes.push({"Vrsta": 'Usmerjevalnik'});
						break;
					case 'stevilo_portov':
					case 'lan_porti':
						const numberMatch = el['#text'].match(/\b\d+x\b/i);
						const speedMatch = el['#text'].match(/\b(?:\d+(\.\d+)?(?:\/\d+)*\s?(Mbps|Gbps)|Gigabit)\b/i);
						const number = numberMatch ? numberMatch[0] : "Ni navedeno";
						const speed = speedMatch ? speedMatch[0].replace(/\s/g, '') : "Ni navedeno"
						attributes.push({"Število LAN priklopov": number});
						keys = attributes.map(obj => Object.keys(obj)[0]);
						if(keys.includes('Hitrost')) {
							break;
						}
						attributes.push({"Hitrost": speed});
						break;
					case 'hitrost':
						keys = attributes.map(obj => Object.keys(obj)[0]);
						if(keys.includes('Hitrost')) {
							break;
						}
						attributes.push({"Hitrost": el['#text']});
						break;
					case 'brezzicna_hitrost':
						keys = attributes.map(obj => Object.keys(obj)[0]);
						if(keys.includes('Hitrost')) {
							break;
						}
						attributes.push({"Hitrost": el['#text']});
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Mrežne kartice, antene, WIFI ojačevalci') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'hitrost':
						attributes.push({"Hitrost": el['#text']});
						break;
					case 'netcrd_povezava_filter':
						attributes.push({"Vrsta": 'Mrežna kartica'});
						attributes.push({"Vrsta povezave": el['#text']});
						break;
					case 'netant_tip_filter':
						attributes.push({"Vrsta":'Antena'});
						break;
					case 'netext_tip_filter':
						attributes.push({"Vrsta":'Wifi ojačevalec'});
						break;
					case 'netext_hitrost':
						attributes.push({"Hitrost": el['#text']});
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Zvočniki') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'spk_priklop_filter':
						attributes.push({"Povezava": el['#text']});
						break;
					case 'stevilo_zvocnikov':
						attributes.push({"Sistem": el['#text']});
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Spletne kamere') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'cam_locljivost_snemanja':
						attributes.push({"Ločljivost": el['#text']});
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'USB ključi') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'kapaciteta':
						attributes.push({"Kapaciteta": el['#text']});
						break;
					case 'vmesnik':
						attributes.push({"Hitrost": el['#text']});
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'Spominske kartice in čitalci') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'kapaciteta':
						attributes.push({"Kapaciteta": el['#text']});
						break;
					case 'hitrost_zapisovanja':
						attributes.push({"Hitrost zapisovanja": el['#text']});
						break;
					case 'hitrost_branja':
						attributes.push({"Hitrost branja": el['#text']});
						break;
					case 'tip_spominske_kartice':
						attributes.push({"Tip kartice": el['#text']});
						break;
					case 'tip_carrdr':
						attributes.push({"Čitalec": "Da"});
						break;
					default:
						break;
				}
			})
		}
		if (this.category === 'UPS') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					case 'izhodna_moc_w':
						attributes.push({"Moč": el['#text']});
						break;
					case 'ups_rack':
						attributes.push({"Postavitev": el['#text']});
						break;
					default:
						break;
				}
			})
		}
		if(this.category ==='Konferenčna oprema') {
			this.attribute.forEach((el) => {
				switch(el['@_id']) {
					case 'manufacturer':
						attributes.push({"Proizvajalec": el['#text']});
						break;
					default:
						break;
				}
			})
		}
		return attributes;
	}
}