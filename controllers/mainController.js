import { insertIntoTable } from "../db/sql.js"

let test = {
    baza: 'izdelki',
    vrstice: [
		"izdelek_id",
		"ean",
		"izdelek_ime",
		"kratki_opis",
		"opis",
		"cena_nabavna",
		"dealer_cena",
		"ppc",
		"davcna_stopnja",
		"slika_mala",
		"slika_velika",
		"dodatne_lastnosti",
		"balgovna_znamka",
		"kategorija",
		"eprel_id",
		"dobavitelj",
    ],
    attr: [
        12345,
        99299,
        'dildo',
        '18cm',
        '18cm in vibracija',
        12,
        15,
        25,
        22,
        null,
        null,
        'pinky',
        'pfy',
        'užitek',
        null,
        'sexfriends'
    ]
}

try {
    insertIntoTable(test.baza, test.vrstice, test.attr);
} catch {
    (err) => console.error(err.message);
}