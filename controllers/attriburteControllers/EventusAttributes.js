export default class EventusAttributes {
	constructor(category, attribute) {
		this.attribute = attribute;
		this.category = category;
	}

	formatAttributes() {
		let match;
		const attributes= [];


		// if(!this.attribute || !this.attribute.length) {
		// 	return null;
		// }

		// if (this.category === 'All in one') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'procesor':
		// 				attributes["Procesor"] = el['#text'];
		// 				break;
		// 			case 'pomnilnik':
		// 				match = el['#text'].match(/(\d+)\s?(GB|TB)/i);
		// 				attributes["Kapaciteta pomnilnika"] = `${match[1]} ${match[2]}`;
		// 				break;
		// 			case 'zaslon':
		// 				attributes["Velikost zaslona"] = el['#text'].match(/^\d+(\.\d+)?/) ? el['#text'].match(/^\d+(\.\d+)?/)[0] + '\"' : el['#text'];
		// 				attributes["Ločljivost"] = el['#text'].match(/\b\d{3,4}\s?x\s?\d{3,4}\b/i)[0];
		// 				break;
		// 			case 'trdi_disk':
		// 				match = el['#text'].match(/(\d+)\s?(GB|TB)/i);
		// 				attributes["Kapaciteta diska"] = `${match[1]} ${match[2]}`;
		// 				break;
		// 			case 'graficna_kartica':
		// 				attributes["Grafična kartica"] = el['#text'];
		// 				break;
		// 			case 'operacijski_sistem':
		// 				attributes["Operacijski sistem"] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Računalniki') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'procesor':
		// 				attributes["Procesor"] = el['#text'];
		// 				break;
		// 			case 'pomnilnik':
		// 				match = el['#text'].match(/(\d+)\s?(GB|TB)/i);
		// 				if (match){
		// 					attributes["Kapaciteta pomnilnika"] = `${match[1]} ${match[2]}`;
		// 				} else {
		// 					attributes["Kapaciteta pomnilnika"] = el['#text'];
		// 				}
		// 				break;
		// 			case 'trdi_disk':
		// 				match = el['#text'].match(/(\d+)\s?(GB|TB)/i);
		// 				attributes["Kapaciteta diska"] = `${match[1]} ${match[2]}`;
		// 				break;
		// 			case 'graficna_kartica':
		// 				attributes["Grafična kartica"] = el['#text'];
		// 				break;
		// 			case 'operacijski_sistem':
		// 				attributes["Operacijski sistem"] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Mini') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'procesor':
		// 				attributes["Procesor"] = el['#text'];
		// 				break;
		// 			case 'pomnilnik':
		// 				match = el['#text'].match(/(\d+)\s?(GB|TB)/i);
		// 				if (match){
		// 					attributes["Kapaciteta pomnilnika"] = `${match[1]} ${match[2]}`;
		// 				} else {
		// 					attributes["Kapaciteta pomnilnika"] = el['#text'];
		// 				}
		// 				break;
		// 			case 'trdi_disk':
		// 				match = el['#text'].match(/(\d+)\s?(GB|TB)/i);
		// 				if (el['#text'].includes('možnost')){
		// 					attributes["Kapaciteta diska"] = "brez";

		// 				} else if (match){
		// 					attributes["Kapaciteta diska"] = `${match[1]} ${match[2]}`;
		// 				} else {
		// 					attributes["Kapaciteta diska"] = el['#text'];
		// 				}
		// 				break;
		// 			case 'graficna_kartica':
		// 				attributes["Grafična kartica"] = el['#text'];
		// 				break;
		// 			case 'operacijski_sistem':
		// 				attributes["Operacijski sistem"] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Tablični računalniki') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'procesor':
		// 				attributes["Procesor"] = el['#text'];
		// 				break;
		// 			case 'pomnilnik':
		// 				match = el['#text'].match(/(\d+)\s?(GB|TB)/i);
		// 				attributes["Kapaciteta pomnilnika"] = `${match[1]} ${match[2]}`;
		// 				break;
		// 			case 'zaslon':
		// 				attributes["Velikost zaslona"] = el['#text'].match(/^\d+(\.\d+)?/) ? el['#text'].match(/^\d+(\.\d+)?/)[0] + '\"' : el['#text'];
		// 				attributes["Ločljivost"] = el['#text'].match(/\b\d{3,4}\s?x\s?\d{3,4}\b/i)[0].replace(/\s?x\s?/i, ' x ');
		// 				break;
		// 			case 'trdi_disk':
		// 				match = el['#text'].match(/(\d+)\s?(GB|TB)/i);
		// 				attributes["Kapaciteta diska"] = `${match[1]} ${match[2]}`;
		// 				break;
		// 			case 'graficna_kartica':
		// 				attributes["Grafična kartica"] = el['#text'];
		// 				break;
		// 			case 'operacijski_sistem':
		// 				attributes["Operacijski sistem"] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'NAS sistemi') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'sto_procesor':
		// 				attributes["Procesor"] = el['#text'];
		// 				break;
		// 			case 'tip_sto':
		// 				attributes["Postavitev"] = el['#text'];
		// 				break;
		// 			case 'sto_pomnilnik':
		// 				match = el['#text'].match(/(\d+)\s?(GB|TB)/i);
		// 				attributes["Kapaciteta pomnilnika"] = `${match[1]} ${match[2]}`;
		// 				break;
		// 			case 'sto_prikljucki':
		// 				match = el['#text'].match(/\b\d+x\sRJ-?45\b/i);
		// 				attributes["št. LAN priklopov"] = `${match[0].replace('-','')}`;
		// 				break;
		// 			case 'sto_reze_za_diske':
		// 				attributes["Število diskov"] = el['#text'];
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Monitorji') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'priklop':
		// 				attributes["Vhodi"] = el['#text'];
		// 				break;
		// 			case 'mon_frekvenca_tekst':
		// 				attributes["Osveževanje"] = el['#text'];
		// 				break;
		// 			case 'tip_matrike':
		// 				attributes["Matrika"] = el['#text'];
		// 				break;
		// 			case 'diagonala_zaslona':
		// 				attributes["Velikost zaslona"] = el['#text']
		// 				break;
		// 			case 'optimalna_locljivost':
		// 				attributes["Ločljivost"] = el['#text'];
		// 				break;
		// 			case 'dodatno':
		// 				if (el['#text'].includes('ukrivljenost')) {
		// 					attributes["Ukrivljenost"] = 'Da';
		// 				}
		// 				break;
		// 			case 'vgrajeni_zvocniki':
		// 				attributes["Zvočniki"] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Osnovne plošče') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'podnozje':
		// 				attributes["Podnožje"] = el['#text'];
		// 				break;
		// 			case 'vezni_nabor':
		// 				attributes["Vezni nabor"] = el['#text'];
		// 				break;
		// 			case 'format_filter_maticne':
		// 				attributes["Format"] = el['#text'];
		// 				break;
		// 			case 'pomnilnik':
		// 				attributes["Pomnilniške reže"] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Procesorji') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'tip_procesorja':
		// 				attributes["Procesor"] = el['#text'];
		// 				break;
		// 			case 'podnozje':
		// 				attributes["Podnožje"] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Pomnilniki') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'tip_ram':
		// 				attributes["Vrsta pomnilnika"] = el['#text'];
		// 				break;
		// 			case 'kapaciteta':
		// 				attributes["Kapaciteta pomnilnika"] = el['#text'].replace(' ','');
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Trdi diski') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'tip_hdd':
		// 				if (el['#text'] === 'No') {
		// 					break;
		// 				}
		// 				attributes["Vrsta diska"] = el['#text'];
		// 				break;
		// 			case 'kapaciteta_hdd_tekst':
		// 				attributes["Kapaciteta diska"] = el['#text'];
		// 				break;
		// 			case 'vmesnik':
		// 				attributes["Vmesnik"] = el['#text'];
		// 				break;
		// 			case 'format':
		// 				if (el['#text'] === 'No') {
		// 					break;
		// 				}
		// 				attributes["Velikost diska"] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Ohišja') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'cas_tip':
		// 				attributes["Velikost"] = el['#text'];
		// 				break;
		// 			case 'napajalnik':
		// 				attributes["Napajalnik"] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Napajalniki') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'moc':
		// 				attributes["Moč"] = el['#text'];
		// 				break;
		// 			case 'pws_format_filter':
		// 				attributes["Format"] = el['#text'];
		// 				break;
		// 			case 'pws_napetosti_tokovi':
		// 				attributes["Modulani"] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Grafične kartice') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'proizvajalec_cipovja':
		// 				attributes["GPU"] = el['#text'];
		// 				break;
		// 			case 'graficni_procesor':
		// 				attributes["Grafični procesor"] = el['#text'];
		// 				break;
		// 			case 'graficni_pomnilnik':
		// 				attributes["Grafični pomnilnik"] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Hlajenje') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'namembnost':
		// 				attributes["Vrsta hlajenja"] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Tipkovnice') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'povezljivost':
		// 				attributes["Povezljivost"] = el['#text'];
		// 				break;
		// 			case 'drugo':
		// 				if (el['#text'].includes('mehanske')) {
		// 					attributes["Mehanska"] = 'Da';
		// 				}
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Miške') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'povezljivost':
		// 				attributes["Povezljivost"] = el['#text'];
		// 				break;
		// 			case 'tip_mou':
		// 				attributes["Senzor"] = el['#text'];
		// 				break;
		// 			case 'mou_locljivost':
		// 				attributes["Ločljivost"] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Slušalke') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'heapho_povezljivost':
		// 				attributes["Povezava"] = el['#text'];
		// 				break;
		// 			case 'heapho_mikrofon':
		// 				attributes["Mikrofon"] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Usmerjevalniki, stikala in AP') {
		// 	let keys;
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'netswi_namestitev':
		// 				attributes["Vrsta"] = 'Stikalo';
		// 				break;
		// 			case 'netapo_postavitev_filter':
		// 				attributes["Vrsta"] = 'Dostopna točka';
		// 				break;
		// 			case 'antena':
		// 				attributes["Vrsta"] = 'Usmerjevalnik';
		// 				break;
		// 			case 'stevilo_portov':
		// 			case 'lan_porti':
		// 				const numberMatch = el['#text'].match(/\b\d+x\b/i);
		// 				const speedMatch = el['#text'].match(/\b(?:\d+(\.\d+)?(?:\/\d+)*\s?(Mbps|Gbps)|Gigabit)\b/i);
		// 				const number = numberMatch ? numberMatch[0] : "Ni navedeno";
		// 				const speed = speedMatch ? speedMatch[0].replace(/\s/g, '') : "Ni navedeno"
		// 				attributes["Število LAN priklopov"] = number;
		// 				keys = attributes.map(obj => Object.keys(obj)[0]);
		// 				if(keys.includes('Hitrost')) {
		// 					break;
		// 				}
		// 				attributes["Hitrost"] = speed;
		// 				break;
		// 			case 'hitrost':
		// 				keys = attributes.map(obj => Object.keys(obj)[0]);
		// 				if(keys.includes('Hitrost')) {
		// 					break;
		// 				}
		// 				attributes["Hitrost"] = el['#text'];
		// 				break;
		// 			case 'brezzicna_hitrost':
		// 				keys = attributes.map(obj => Object.keys(obj)[0]);
		// 				if(keys.includes('Hitrost')) {
		// 					break;
		// 				}
		// 				attributes["Hitrost"] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Mrežne kartice, antene, WIFI ojačevalci') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'hitrost':
		// 				attributes["Hitrost"] = el['#text'];
		// 				break;
		// 			case 'netcrd_povezava_filter':
		// 				attributes["Vrsta"] = 'Mrežna kartica';
		// 				attributes["Vrsta povezave"] = el['#text'];
		// 				break;
		// 			case 'netant_tip_filter':
		// 				attributes["Vrsta"] ='Antena';
		// 				break;
		// 			case 'netext_tip_filter':
		// 				attributes["Vrsta"] ='Wifi ojačevalec';
		// 				break;
		// 			case 'netext_hitrost':
		// 				attributes["Hitrost"] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Zvočniki') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'spk_priklop_filter':
		// 				attributes["Povezava"] = el['#text'];
		// 				break;
		// 			case 'stevilo_zvocnikov':
		// 				attributes["Sistem"] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Spletne kamere') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'cam_locljivost_snemanja':
		// 				attributes["Ločljivost"] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'USB ključi') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'kapaciteta':
		// 				attributes["Kapaciteta"] = el['#text'];
		// 				break;
		// 			case 'vmesnik':
		// 				attributes["Hitrost"] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Spominske kartice in čitalci') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'kapaciteta':
		// 				attributes["Kapaciteta"] = el['#text'];
		// 				break;
		// 			case 'hitrost_zapisovanja':
		// 				attributes["Hitrost zapisovanja"] = el['#text'];
		// 				break;
		// 			case 'hitrost_branja':
		// 				attributes["Hitrost branja"] = el['#text'];
		// 				break;
		// 			case 'tip_spominske_kartice':
		// 				attributes["Tip kartice"] = el['#text'];
		// 				break;
		// 			case 'tip_carrdr':
		// 				attributes["Čitalec"] = "Da";
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if (this.category === 'Brezprekinitveni napajalniki') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			case 'izhodna_moc_w':
		// 				attributes["Moč"] = el['#text'];
		// 				break;
		// 			case 'ups_rack':
		// 				attributes["Postavitev"] = el['#text'];
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		// if(this.category ==='Konferenčna oprema') {
		// 	this.attribute.forEach((el) => {
		// 		switch(el['@_id']) {
		// 			default:
		// 				break;
		// 		}
		// 	})
		// }
		return attributes;
	}
}