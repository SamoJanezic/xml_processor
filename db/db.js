import sqlite from "sqlite3";

export const db = new sqlite.Database(`${process.cwd()}/db/sqlite/test.db`, sqlite.OPEN_READWRITE, (err) => {
    if(err)console.error(err);
});
