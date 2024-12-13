import { sqlDrop } from "../db/sql.js";
import { db } from "../db/db.js"


db.run(sqlDrop, [], (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log('Table izdelki removed successfully')
    }
});
