import * as fs from 'fs';
import { XMLBuilder } from "fast-xml-parser";
import { db } from '../db/db.js';
import { IzdelekDobavitelj } from '../Models/IzdelekDobavitelj.js';

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



const izdelek = await IzdelekDobavitelj.findOne({where: {izdelek_ean: 5099206027176}});

console.log(izdelek)


const head = `<?xml version="1.0" encoding="UTF-8"?>
<podjetje id="Acord 92, Ljubljana" storitev="BSMAGE/xml-export" uporabnik="prodaja@softtrade.si" ts="05.03.2025 09:12:48" opis_storitve="https://www.pcplus.si/catalog-export/">
<izdelki>
`;

const foot = `</izdelki>
</podjetje>`;

const options = {
    arrayNodeName: "izdelek",
    ignoreAttributes : false,
    format: true,
	cdataPropName: "lastnost",
}

const builder = new XMLBuilder(options);

const file = `${process.cwd()}/../xml/softtrade.xml`

const output = builder.build(products);

fs.writeFileSync(file, head, (err) => {
    if (err) throw err;
    console.log('saved!');
});

fs.appendFileSync(file, output, (err) => {
	if (err) throw err;
	console.log('bla')
})

fs.appendFileSync(file, foot);