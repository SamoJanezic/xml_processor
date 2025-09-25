import { controllerMap } from "./controllers/index.js";
import { categoryMap } from "./controllers/categoryMaps/index.js";
import { attributesMap } from "./controllers/attributeControllers/index.js";

export function executeAll() {
	Object.entries(controllerMap).forEach(([key, Controller]) => {
		const category = categoryMap[key];
		const attributes = attributesMap[key]
		const instance = new Controller(category, attributes);
		instance.executeAll();
	});
}

executeAll();