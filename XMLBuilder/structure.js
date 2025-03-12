import * as fs from 'fs';



let info = [{
    id: 123,
    izdelekId: 321,
    ean: "3322444111",
    izdelek_ime: "logitech miška",
    opis: "navadna miška",
    ppc: 19.22,
    nabavnaCena: 15.44,
    dc: 16.12,
    blagovna_znamka: "Logitech",
    davcna_stopnja: 22,
    kategorija: "miške",
    slika_mala: "http:slikaMala",
    slika_velika: "http:slikaVelika",
    dobava: "na zalogi",
    dodatneLastnosti: "bla"
}];

const head = `<?xml version="1.0" encoding="UTF-8"?>
<podjetje id="Acord 92, Ljubljana" storitev="BSMAGE/xml-export" uporabnik="prodaja@softtrade.si" ts="05.03.2025 09:12:48" opis_storitve="https://www.pcplus.si/catalog-export/">
  <izdelki>
    `

const foot = `  </izdelki>
</podjetje>`

function createBody(el) {

return `<izdelek id="${el.id}">
      <izdelekID>${el.izdelekId}</izdelekID>
      <EAN>${el.ean}</EAN>
      <izdelekIme><![CDATA[${el.izdelek_ime}]]></izdelekIme>
      <url/>
      <opis><![CDATA[${el.opis}]]></opis>
      <PPC>${el.ppc}</PPC>
      <cenaAkcijska></cenaAkcijska>
      <nabavnaCena>${el.nabavnaCena}</nabavnaCena>
      <DC>${el.dc}</DC>
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
      <kategorija id="${el.kategorijaId}">${el.kategorija}</kategorija>
      <slikaMala><![CDATA[${el.slika_mala}]]></slikaMala>
      <slikaVelika><![CDATA[${el.slika_velika}]]></slikaVelika>
      <dobava id="el.dobava_id">${el.dobava}</dobava>
      <spletnaStranProizvajalca></spletnaStranProizvajalca>
      <dodatneLastnosti>
      ${el.dodatneLastnosti}
      </dodatneLastnosti>
    </izdelek>
`
}

const file = `${process.cwd()}/../xml/softtrade.xml`;

export function build($file) {
    fs.writeFileSync($file, head, (err) => {
        if (err) throw err;
        console.log('Head saved!');
    });

    fs.appendFileSync($file, createBody(info[0]), (err) => {
        if (err) throw err;
        console.log('Body saved!');
    });

    fs.appendFileSync($file, foot);
}

build(file);