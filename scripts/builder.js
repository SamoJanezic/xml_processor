// import * as fs from 'fs';
import fsp from "fs/promises";
import { getIzdelekInfo, getAtributInfo, getSlikaInfo } from "../db/sql.js";

async function createBody(el) {
	const izdelekId = `softT${el.id}`;
	const atributInfo = await getAtributInfo(el.ean);
	const slike = await getSlikaInfo(el.ean);
	let count = 1;
	let dodatneLastnosti = ``;
	let dodatneSlike = ``;
	let slikaMala;
	let slikaVelika;

	atributInfo[0].forEach((el, idx) => {
		if (idx === atributInfo[0].length - 1) {
			dodatneLastnosti += `        <lastnost naziv="${el.komponenta.replace('"',"")}" id="${el.komponenta_id}"><![CDATA[${el.atribut}]]></lastnost>`;
		} else {
			dodatneLastnosti += `        <lastnost naziv="${el.komponenta.replace('"',"")}" id="${el.komponenta_id}"><![CDATA[${el.atribut}]]></lastnost>\r\n`;
		}
	});

	slike.forEach((el, idx) => {
		if(el.tip === "mala") {
			slikaMala = el.slika_url ? el.slika_url : '';
		} else if (el.tip === "velika") {
			slikaVelika = el.slika_url ? el.slika_url : '';
		} else if (el.tip === "dodatna") {
			if (idx === slike.length - 1) {
				dodatneSlike += `        <dodatnaSlika${count}><![CDATA[${el.slika_url}]]></dodatnaSlika${count}>`;
			} else {
				dodatneSlike += `        <dodatnaSlika${count}><![CDATA[${el.slika_url}]]></dodatnaSlika${count}>\r\n`;
			}
			count++;
		}
	});

	return `  <izdelek id="${el.id}">
      <izdelekID>${izdelekId}</izdelekID>
      <EAN>${el.ean}</EAN>
      <izdelekIme><![CDATA[${el.izdelek_ime}]]></izdelekIme>
      <url/>
      <opis><![CDATA[${el.izdelek_opis}]]></opis>
      <PPC>${el.ppc}</PPC>
      <cenaAkcijska></cenaAkcijska>
      <nabavnaCena>${el.nabavna_cena}</nabavnaCena>
      <DC>${el.dealer_cena}</DC>
      <DRabat>0</DRabat>
      <blagovnaZnamka id="${el.blagovna_znamka}"><![CDATA[${el.blagovna_znamka}]]></blagovnaZnamka>
      <dimenzijePaketa kratekZapisVCm="xx">
        <depth unitOfMeasure="MM">/</depth>
        <height unitOfMeasure="MM">/</height>
        <width unitOfMeasure="MM">/</width>
        <grossWeight unitOfMeasure="KG">/</grossWeight>
        <netWeight unitOfMeasure="KG">/</netWeight>
      </dimenzijePaketa>
      <davcnaStopnja>${el.davcna_stopnja}</davcnaStopnja>
      <kategorija id="${el.kategorija_id}">${el.kategorija}</kategorija>
      <slikaMala><![CDATA[${slikaMala}]]></slikaMala>
      <slikaVelika><![CDATA[${slikaVelika}]]></slikaVelika>
      <dobava id="${el.zaloga === 'Na zalogi' ? 1 : 0}">${el.zaloga}</dobava>
      <spletnaStranProizvajalca></spletnaStranProizvajalca>
      <dodatneLastnosti>
${dodatneLastnosti}
      </dodatneLastnosti>
      <dodatneSlike>
${dodatneSlike}
      </dodatneSlike>
    </izdelek>
  `;
}

export async function build() {
	const file = `xml/softtrade.xml`;
	const izdelekInfo = await getIzdelekInfo();

	const head = `<?xml version="1.0" encoding="UTF-8"?>
<podjetje id="Acord 92, Ljubljana" storitev="BSMAGE/xml-export" uporabnik="prodaja@softtrade.si" ts="05.03.2025 09:12:48" opis_storitve="https://www.pcplus.si/catalog-export/">
  <izdelki>
    `;
	const foot = `</izdelki>
</podjetje>`;

	try {
		await fsp.writeFile(file, head);
		console.log("File created & head written...");
	} catch (err) {
		console.error(err.message);
	}

	// try {
	// 	for (let i = 1; i < 25; i++) {
	// 		const body = await createBody(izdelekInfo[0][i]);
	// 		await fsp.appendFile(file, body);
	// 	}
	// 	console.log("Body added...");
	// } catch (err) {
	// 	console.error(err.message);
	// }

	try {
	  for (const el of izdelekInfo[0]) {
	    const body = await createBody(el);
	    await fsp.appendFile(file, body);
	  }
	  console.log("Body added...");
	} catch (err) {
	  console.error(err.message);
	}

	try {
		await fsp.appendFile(file, foot);
		console.log(`Writing of ${file} Finished!`);
	} catch (err) {
		console.error(err.message);
	}
}

build();
