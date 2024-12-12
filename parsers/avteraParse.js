import { XMLParser} from "fast-xml-parser";
import { readFileSync } from 'fs';
import sqlite from "sqlite3";
import { sqlInsert } from "../sql.js";

const db = new sqlite.Database(`${process.cwd()}/database/test.db`, sqlite.OPEN_READWRITE, (err) => {
    if(err)console.error(err);
});

const xmlFile = readFileSync(`${process.cwd()}/xml/avtera.xml`, 'utf8');
const parser = new XMLParser();
const json = parser.parse(xmlFile);


export function acordInsertIntoDb() {
    const avteraData = json.podjetje.izdelki.izdelek;
    avteraData.forEach(el => { 
        if(el.EAN === '') {
            el.EAN = null;
        }
        db.run(sqlInsert, [
            el.EAN,
            el.izdelekIme,
            el.opis,
            el.PPC,
            el.nabavnaCena,
            el.blagovnaZnamka,
            el.kategorija,
            el.slikaMala,
            el.slikaVelika,
            el.dobava
        ] , (err) => {
            if(err){
                console.error(err);
            }
        });
    });
}
