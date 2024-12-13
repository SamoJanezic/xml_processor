import { XMLParser} from "fast-xml-parser";
import { readFileSync } from 'fs';
import { sqlInsert, sqlUpdate } from "../db/sql.js";
import { db } from "../db/db.js"



export function insertIntoDb(obj) {

    const xmlFile = readFileSync(`${process.cwd()}/xml/${obj.file}`, 'utf8');
    const parser = new XMLParser();
    const json = parser.parse(xmlFile);
    const products = eval(obj.nodes);  //this is data in xml as json


    products.forEach(product => {
        let values = obj.keys.map(key => {
            if (product[key] === '') {
                return null;
            }
            if (product[key].constructor === Object) {
                return Object.values(product[key])[0];
            }
            return product[key];
        });
        let ean = values[0];

        if (ean) {
            db.run(sqlInsert, values , (err) => {
                if(err){
                    if(err.code === "SQLITE_CONSTRAINT") {
                        db.run(sqlUpdate, ean, err => console.error(err));
                    }
                    console.error(err.code);
                }
            });
        }
    });
}