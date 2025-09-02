import BaseAttributes from "./BaseAttributes.js";

class ElkotexAttributes extends BaseAttributes{
	constructor(category, attribute) {
		this.category = category;
		this.attribute = BaseAttributes.normalizeAttributes(attribute);
	}

	static defaultHandler(attrKey, attrValue) {
		return { [attrKey]: attrValue };
	}

	formatAttributes() {
		if (!this.attribute || !Object.keys(this.attribute).length) return {};

		const attributes = {};

		const attributeHandlers = {
			"Dodatki za prenosnike": {
				_default: () => ({ "Vrsta dodatka": "Torbe" }),
			},
			"Potrošni material": {
				_default: attrs => {
					if (
						attrs.hasOwnProperty("Kapaciteta") ||
						attrs.hasOwnProperty("Za naprave")
					) {
						return { Vrsta: "Črnilo" };
					}
					return { Vrsta: "Papir" };
				},
				Kapaciteta: val => ({
					Kapaciteta: BaseAttributes.extractCapacity(val),
				}),
			},
			"Napajalniki": {
				Moč: val => ({ Moč: `${val} W` }),
			},
			"Optične enote": {
				_default: attrs => ({
					"Vrsta optične enote": attrs.hasOwnProperty("Vmesnik")
						? "Zunanja"
						: "Notranja",
				}),
			},
			"Ohišja": {
				Napajalnik: val => ({ Napajalnik: val }),
				"Tip ohišja": val => ({ Velikost: val }),
			},
			"Pomnilniki": {
				Tip: val => ({ "Vrsta pomnilnika": val }),
				Kapaciteta: val => ({
					"Kapaciteta pomnilnika": BaseAttributes.extractCapacity(val),
				}),
			},
		};

		const handlers = attributeHandlers[this.category] || {};

		// Handle category-wide defaults
		if (handlers._default) {
			Object.assign(attributes, handlers._default(this.attribute));
		}

		// Process attributes one by one
		Object.entries(this.attribute).forEach(([key, value]) => {
			const handler = handlers[key];
			const result = handler
				? handler(value)
				: BaseAttributes.defaultHandler(key, value);

			Object.assign(attributes, result);
		});

		return attributes;
	}
}

export default ElkotexAttributes;
