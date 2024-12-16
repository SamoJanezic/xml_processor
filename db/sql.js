
export const sqlCreate = `CREATE TABLE izdelki(
    id INTEGER PRIMARY KEY,
    izdelek_id,
    ean,
    izdelek_ime,
    kratki_opis,
    opis,
    cena_nabavna,
    dealer_cena,
    ppc,
    davčna_stopnja,
    slika_mala,
    slika_velika,
    dodatne_lastnosti,
    balgovna_znamka,
    kategorija,
    eprel_id,
    dobavitelj
)`;

export const sqlInsert = `INSERT INTO izdelki(
    izdelek_id,
    ean,
    izdelek_ime,
    kratki_opis,
    opis,
    cena_nabavna,
    dealer_cena,
    ppc,
    davčna_stopnja,
    slika_mala,
    slika_velika,
    dodatne_lastnosti,
    balgovna_znamka,
    kategorija,
    eprel_id,
    dobavitelj) VALUES (
    ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
)`;

function findOne(ean) {
    const sql = `SELECT * FROM izdelki WHERE ean = ${ean}`;
    db.all(sql, (err, rows) => {
        if (err) return console.error(err.message);

        console.log(Boolean(rows[0]));
    });
}

export const sqlUpdate = `UPDATE izdelki SET izdelek_ime = 'spremenjen' WHERE ean = ?`;

export const sqlSelect = `SELECT * FROM izdelki`;

export const sqlDrop = `DROP TABLE izdelki`;