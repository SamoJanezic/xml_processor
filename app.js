import sqlite from "sqlite3";
import { acordInsertIntoDb } from "./xml/acordParse.js"


const db = new sqlite.Database('./database/test.db', sqlite.OPEN_READWRITE, (err) => {
    if(err)console.error(err);
});


acordInsertIntoDb();


