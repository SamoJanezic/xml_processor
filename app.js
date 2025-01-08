import { acordController } from "./controllers/acordController.js";
import { avteraController } from "./controllers/avteraController.js";
import { colbyController } from "./controllers/colbyController.js";
import { elkotexController } from "./controllers/elkotexController.js";
import { eventusController } from "./controllers/eventusController.js";
import { findOne, insertIntoTable } from "./db/sql.js";



const acord = new acordController();
acord.executeAll();

const avtera = new avteraController();
avtera.executeAll();

const colby = new colbyController();
colby.executeAll();

const elkotex = new elkotexController();
elkotex.executeAll();

const eventus = new eventusController();
eventus.executeAll();

// let bool = await findOne('EAN', 5099206030015);
// console.log(bool)