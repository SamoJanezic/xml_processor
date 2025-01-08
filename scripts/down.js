import { dropTable } from "../db/sql.js";

try {
    dropTable('izdelki');
    console.log("Tabela izdelki izbrisana");
    dropTable('duplikati');
    console.log("Tabela duplikati izbrisana");
} catch (err) {
    console.log(err.message);
}

