import { parser } from "./parseController.js";
import { sqlInsert, sqlUpdate } from "../db/sql.js";
import { db } from "../db/db.js"


export function insertIntoDb(obj) {

    const data = parser(obj);


    data.forEach(product => {
        let values = obj.keys.map(key => {
            if (product[key] === '') {
                return null;
            }
            if (product[key] === undefined) {
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