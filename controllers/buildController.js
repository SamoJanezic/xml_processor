import * as fs from 'fs';
import { XMLBuilder } from "fast-xml-parser";

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
		blagovnaZnamka: "POWERWALKER",
		dimenzijePaketa: {
			depth : 180,
			height: 170,
			width: 70,
			grossWeight: 6.00,
			netWeight: 7.00,
		},
		davcnaStopnja: 22,
		kategorija: "UPS napajanja",
		slikaMala:
			"https://www.pcplus.si/media/catalog/product/cache/1/small_image/120x/602f0fa2c1f0d1ba5e241f914e856ff9/1/2/128944_14.jpg",
		slikaVelika:
			"https://www.pcplus.si/media/catalog/product/1/2/128944_14.jpg",
		dobava: "Na zalogi",
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
				{ naziv: "Spin", text: "1200rpm" },
				{ naziv: "čas", text: "24h" },
			],
		},
	},
];

const head = `<?xml version="1.0" encoding="UTF-8"?>
<podjetje id="Acord 92, Ljubljana" storitev="BSMAGE/xml-export" uporabnik="prodaja@softtrade.si" ts="05.03.2025 09:12:48" opis_storitve="https://www.pcplus.si/catalog-export/">
<izdelki>
`;

const foot = `</izdelki>
</podjetje>`

const options = {
    arrayNodeName: "izdelek",
    ignoreAttributes : false,
    format:true,
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