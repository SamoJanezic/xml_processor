import { createTable } from "../db/sql.js";

let columns = [
	"id INTEGER PRIMARY KEY",
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
];

try {
	createTable("izdelki", columns.join());
} catch (err) {
	console.log(err.message);
}
