import sqlite from "sqlite3";
import { sqlDrop } from "../sql.js";

const db = new sqlite.Database('./database/test.db', sqlite.OPEN_READWRITE, (err) => {
    if(err)console.error(err);
});


db.run(sqlDrop, [], (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log('Table izdelki removed successfully')
    }
});
