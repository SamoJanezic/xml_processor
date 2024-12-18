import { acordController } from "./controllers/acordController.js";
import { avteraController } from "./controllers/avteraController.js";

const acord = new acordController();
acord.createObj();
acord.addKratki_opis();
acord.insertDataIntoDb();

const avtera = new avteraController();
avtera.createObj();
// avtera.removeRezervniDeli();
avtera.insertDataIntoDb();
