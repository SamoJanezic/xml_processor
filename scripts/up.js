import { createTable } from "../db/sql.js";
import { izdelekTest } from "../Models/test.js";
import { Izdelek } from "../Models/Izdelek.js";
import { IzdelekDobavitelj } from "../Models/IzdelekDobavitelj.js";
import { Kategorija } from "../Models/Kategorija.js";
import { DobaviteljTabela } from "../Models/Dobavitelj.js"
import { Komponenta } from "../Models/Komponenta.js";
import { Atribut } from "../Models/Atribut.js";

// createTable(izdelekTest);
createTable(Izdelek);
createTable(IzdelekDobavitelj);
createTable(Kategorija);
createTable(izdelekTest);
createTable(DobaviteljTabela);
createTable(Komponenta);
createTable(Atribut);