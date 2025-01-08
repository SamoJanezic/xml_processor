import { createTable } from "../db/sql.js";

const izdelki = [
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

const duplikati = [
	"id INTEGER PIMARY KEY",
	"izdelek_ime",
	"ean",
	"cena_nabavna",
	"dealer_cena",
	"ppc",
	"dobavitelj"
]



try {
	createTable("izdelki", izdelki.join());
	console.log("Tabela izdelki kreirana");
	createTable("duplikati", duplikati.join());
	console.log("tabela duplikati kreirana")
} catch (err) {
	console.log(err.message);
}
