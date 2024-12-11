import sqlite from "sqlite3";
import { sqlCreate, sqlSelect, sqlDrop } from "./sql.js";
import { acordInsertIntoDb } from "./xml/acordParse.js"



const db = new sqlite.Database('./database/test.db', sqlite.OPEN_READWRITE, (err) => {
    if(err)console.error(err);
});

// db.run(sqlCreate);

// acordInsertIntoDb();



// const sql = 'SELECT * FROM izdelki WHERE ean = 543';
// db.all(sql, (err, rows) => {
//     if (err) return console.error(err.message);

//     console.log(Boolean(rows[0]));
// });


