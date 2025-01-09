import { dropTable } from "../db/sql.js";

try {
    dropTable('izdelki');
    console.log("Tabela izdelki izbrisana");
} catch (err) {
    console.log(err.message);
}

