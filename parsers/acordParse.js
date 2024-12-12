import { XMLParser} from "fast-xml-parser";
import { readFileSync } from 'fs';
import sqlite from "sqlite3";
import { sqlInsert } from "../sql.js";

const db = new sqlite.Database(`${process.cwd()}/database/test.db`, sqlite.OPEN_READWRITE, (err) => {
    if(err)console.error(err);
});


export function insertIntoDb(obj) {
    
    const xmlFile = readFileSync(`${process.cwd()}/xml/${obj.file}`, 'utf8');  // `${process.cwd()}/xml/acord.xml` -> this is xml file
    const parser = new XMLParser();
    const json = parser.parse(xmlFile);
    const data = json[obj.nodes1];  //this is data in xml as json
    // const data = json["podjetje"]["izdelki"]["izdelek"];
    // const data = json.podjetje.izdelki.izdelek

    console.log(data);
    process.exit();
    // data.forEach(el => { 
        // if(el.EAN === '') {
        //     el.EAN = null;
        // }
        // db.run(sqlInsert, [obj.attributes] , (err) => {
        //     if(err){
        //         console.error(err);
        //     }
        // });
    // });
}

