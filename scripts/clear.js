import { clearTable } from "../db/sql.js";
import { izdelek } from "../Models/test.js";

try {
    clearTable(izdelek);
} catch (err) {
    console.log(err.message)
}

