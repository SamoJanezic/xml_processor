import { clearTable } from "../db/sql.js";

try {
    clearTable('izdelki');
} catch (err) {
    console.log(err.message)
}

