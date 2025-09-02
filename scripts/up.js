import { createTable } from "../db/sql.js";
import { Izdelek } from "../Models/Izdelek.js";
import { IzdelekDobavitelj } from "../Models/IzdelekDobavitelj.js";
import { Kategorija } from "../Models/Kategorija.js";
import { Dobavitelj } from "../Models/Dobavitelj.js"
import { Komponenta } from "../Models/Komponenta.js";
import { Atribut } from "../Models/Atribut.js";
import { Slika } from "../Models/Slika.js";

const tables = [
  Kategorija,
  Dobavitelj,
  Izdelek,
  Komponenta,
  IzdelekDobavitelj,
  Slika,
  Atribut,
];


export function up() {
	tables.forEach((table) => {
	  createTable(table);
	});
}

up()

// createTable(Izdelek);
// createTable(IzdelekDobavitelj);
// createTable(Kategorija);
// createTable(Dobavitelj);
// createTable(Komponenta);
// createTable(Atribut);
// createTable(Slika);