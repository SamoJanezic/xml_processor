import { insertIntoDb } from "./controllers/mainController.js"
import { dobavitelji } from "./dobavitelji.js"


let vsiDobavitelji = [];

for(let key in dobavitelji) {
    vsiDobavitelji.push(key);
}

vsiDobavitelji.forEach(el => insertIntoDb(dobavitelji[el]))

// insertIntoDb(dobavitelji.acord);
// insertIntoDb(dobavitelji.avtera);
// insertIntoDb(dobavitelji.colby);
// insertIntoDb(dobavitelji.elkotex);
// insertIntoDb(dobavitelji.eventus);

