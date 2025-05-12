import { acordController } from "./controllers/acordController.js";
import { avteraController } from "./controllers/avteraController.js";
import { colbyController } from "./controllers/colbyController.js";
import { elkotexController } from "./controllers/elkotexController.js";
import { eventusController } from "./controllers/eventusController.js";
import { asbisController } from "./controllers/asbisController.js";
import { alsoController } from "./controllers/alsoController.js";

export function executeXML() {
	const also = new alsoController();
	also.executeAll();

	const acord = new acordController();
	acord.executeAll();

	const avtera = new avteraController();
	avtera.executeAll();

	const eventus = new eventusController();
	eventus.executeAll();

	const asbis = new asbisController();
	asbis.executeAll();

	const colby = new colbyController();
	colby.executeAll();

	const elkotex = new elkotexController();
	elkotex.executeAll();
}