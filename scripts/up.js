import { sqlCreate } from "../db/sql.js";
import { db } from "../db/db.js"


db.run(sqlCreate, [], (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log('Table izdelki created successfully')
    }
});
