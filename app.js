import sqlite from "sqlite3";
import { insertIntoDb } from "./parsers/acordParse.js"
import { dobavitelji } from "./dobavitelji.js"



const db = new sqlite.Database('./database/test.db', sqlite.OPEN_READWRITE, (err) => {
    if(err)console.error(err);
});


insertIntoDb(dobavitelji.acord);

