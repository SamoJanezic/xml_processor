import { clearTable } from "../db/sql.js";
import { izdelekTest } from "../Models/test.js";

try {
    clearTable(izdelekTest);
} catch (err) {
    console.log(err.message)
}

