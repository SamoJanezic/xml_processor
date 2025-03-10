import * as fs from 'fs';
import { XMLBuilder } from "fast-xml-parser";
import { db } from '../db/db.js';
import { softtradePodatki } from '../db/sql.js';

const file = `${process.cwd()}/../xml/softtrade.xml`

console.log(softtradePodatki);

const products = [
	{
		izdelekID: 123,
		EAN: 3830005678,
		izdelekIme: "POWERWALKER VI 650 SH Line Interactive 650VA 360W HID UPS brezprekinitveno napajanje",
		url: null,
		opis: "PowerWalker VI 650 SH ponuja zaščito in moč v majhnem in ekonomičnem paketu. UPS se lahko samodejno zažene brez električnega.",
		PPC: 50.59,
		cenaAkcijska: null,
		nabavnaCena: 43.99,
		DC: 43.99,
		DRabat: 0,
		blagovnaZnamka: {'#text': 'POWERWALKER', '@_id': 'POWERWALKER'},
		dimenzijePaketa: null,
		davcnaStopnja: 22,
		kategorija: {'#text': 'UPS napajanja', '@_id': '105'},
		slikaMala:
			"https://www.pcplus.si/media/catalog/product/cache/1/small_image/120x/602f0fa2c1f0d1ba5e241f914e856ff9/1/2/128944_14.jpg",
		slikaVelika:
			"https://www.pcplus.si/media/catalog/product/1/2/128944_14.jpg",
		dobava: {'#text': 'Na zalogi', '@_id': '1'},
		spletnaStranProizvajalca: null,
		dodatneLastnosti: {
			lastnost: [
				{ naziv: "Tip", text: "Offline/back UPS" },
				{ naziv: "izhodna moč", text: "600 VA" },
			],
		},
	},
	{
		izdelekIme: "POWERWALKER VI 650 SH Line Interactive 650VA 360W HID UPS brezprekinitveno napajanje",
		opis: "PowerWalker VI 650 SH zažene brez električnega.",
		PPC: 50.59,
		nabavnaCena: 43.99,
		DC: 43.99,
		DRabat: 0,
		blagovnaZnamka: "POWERWALKER",
		davcnaStopnja: 22,
		kategorija: "UPS napajanja",
		slikaMala:
			"https://www.pcplus.si/media/catalog/product/cache/1/small_image/120x/602f0fa2c1f0d1ba5e241f914e856ff9/1/2/128944_14.jpg",
		slikaVelika:
			"https://www.pcplus.si/media/catalog/product/1/2/128944_14.jpg",
		dobava: "Na zalogi",
		dodatneLastnosti: {
			lastnost: [
				{ '#text': "1200rpm", '@_naziv': "Spin", '@_id': 'spin' },
				{ '#text': "24h", '@_naziv': "čas", '@_id': 'cas' },
			],
		},
		dodatneSlike: {
			dodatnaSlika1: 'https://www.pcplus.si/media/catalog/product/1/2/128942_11.jpg'
		},
		'@_id': '40'
	},
];

export const softtradePodatki = await db.query(
	`SELECT ean,
		blagovna_znamka,
		ime_izdelka,
		nabavna_cena,
		ppc,
		kategorija,
		komponenta,
		atribut
	FROM IZDELEK
		INNER JOIN
		IZDELEK_DOBAVITELJ ON IZDELEK.ean = IZDELEK_DOBAVITELJ.izdelek_ean
		INNER JOIN
		KATEGORIJA ON IZDELEK_DOBAVITELJ.KATEGORIJA_kategorija = KATEGORIJA.kategorija
		INNER JOIN
		KOMPONENTA ON KATEGORIJA.kategorija = KOMPONENTA.KATEGORIJA_kategorija
		INNER JOIN
		ATRIBUT ON IZDELEK.ean = ATRIBUT.izdelek_ean AND
		KOMPONENTA.komponenta = ATRIBUT.KOMPONENTA_komponenta`);

const options = {
    arrayNodeName: "izdelek",
    ignoreAttributes : false,
    format: true,
	cdataPropName: "lastnost",
}

const builder = new XMLBuilder(options);

const output = builder.build(products);

function formatNodes(node) {
	const outputNode = {
		IzdelekID: 123,
		EAN: node.ean,
		izdelekIme: node.ime_izdelka,
		url: 'www.bla.com',
		opis: node.opis,
		PPC: node.ppc,
		cenaAkcijska: node.cenaAkcijska,
		nabavnaCena: node.nabavna_cena,
		DC: node.dealer_cena,
		DRabat: 0,
		blagovnaZnamka: node.blagovna_znamka,
		dimenzijePaketa: {
			depth: 0,
			height: 0,
			width:0,
			grossWeight:0.00,
			netWeight: 0.0000
		},
		davcnaStopnja: node.davcna_stopnja,
		kategorija: node.kategorija,
		slikaMala: node.slika_mala,
		slikaVelika: node.slika_velika,
		dobava: 'na zalogi',
		spletnaStranProizvajalca: '',
		dodatneLastnosti: node.dodatneLastnosti
	}

	return outputNode;
}




function build($file) {
	const head = `<?xml version="1.0" encoding="UTF-8"?>
<podjetje id="Acord 92, Ljubljana" storitev="BSMAGE/xml-export" uporabnik="prodaja@softtrade.si" ts="05.03.2025 09:12:48" opis_storitve="https://www.pcplus.si/catalog-export/">
<izdelki>
`;
	const foot = `</izdelki>
	</podjetje>`;

	fs.writeFileSync($file, head, (err) => {
		if (err) throw err;
		console.log('saved!');
	});

	fs.appendFileSync($file, output, (err) => {
		if (err) throw err;
		console.log('bla');
	});

	fs.appendFileSync($file, foot);
}

// build(file);