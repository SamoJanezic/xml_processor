import { clearTable } from "../db/sql.js";

try {
    clearTable('izdelki');
    clearTable('duplikati')
} catch (err) {
    console.log(err.message)
}

