import { acordController } from "./controllers/acordController.js";
import { avteraController } from "./controllers/avteraController.js";
import { eventusController } from "./controllers/eventusController.js";
import { colbyController } from "./controllers/colbyController.js";
import { elkotexController } from "./controllers/elkotexController.js";

const acord = new acordController();
const avtera = new avteraController();

acord.executeAll();
avtera.executeAll();
