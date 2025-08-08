import { controllerMap } from "./controllers/index.js";
import { categoryMap } from "./controllers/categoryMaps/index.js";

export function executeAll() {
	Object.entries(controllerMap).forEach(([key, Controller]) => {
		const category = categoryMap[key];
		const instance = new Controller(category);
		instance.executeAll();
	});
}

executeAll();