import { dropTable } from "../db/sql.js";

try {
    dropTable('izdelki');
} catch (err) {
    console.log(err.message)
}

