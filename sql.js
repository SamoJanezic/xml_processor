// import sqlite from "sqlite3";

// let sql;

// const db = new sqlite.Database('./database/test.db', sqlite.OPEN_READWRITE, (err) => {
//     if(err)console.error(err);
// });


export const sqlCreate = `CREATE TABLE izdelki(
    id INTEGER PRIMARY KEY,
    ean UNIQUE,
    izdelek_ime,
    opis,
    cena_prodajna,
    cena_nabavna,
    proizvajalec,
    kategorija,
    slika_mala,
    slika_velika,
    zaloga
)`;

export const sqlInsert = `INSERT INTO izdelki(
    ean,
    izdelek_ime,
    opis,
    cena_prodajna,
    cena_nabavna,
    proizvajalec,
    kategorija,
    slika_mala,
    slika_velika,
    zaloga) VALUES (
    ?,?,?,?,?,?,?,?,?,?
)`;

function findOne(ean) {
    const sql = `SELECT * FROM izdelki WHERE ean = ${ean}`;
    db.all(sql, (err, rows) => {
        if (err) return console.error(err.message);

        console.log(Boolean(rows[0]));
    });
}



export const sqlSelect = `SELECT * FROM izdelki`;

export const sqlDrop = 'DROP TABLE izdelki';