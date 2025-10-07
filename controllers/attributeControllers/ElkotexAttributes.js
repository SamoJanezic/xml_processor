import BaseAttributes from "./BaseAttributes.js";

class ElkotexAttributes{
	constructor(category, attribute) {
		this.category = category;
		this.attribute = attribute;
	}

	static normalizeAttributes(attrs) {
		if (!attrs) return {};
		if (Array.isArray(attrs)) return attrs; // Eventus keeps array structure

		const normalized = {};
		Object.entries(attrs).forEach(([key, value]) => {
			const normKey =
				key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
			normalized[normKey] =
				typeof value === "string" ? value.trim() : value;
		});
		return normalized;
	}

	static extractCapacity(text) {
		if (!text) return text;
		const match = text.match(/(\d+)\s?(GB|TB|MB|ml)/i);
		return match ? `${match[1]} ${match[2].toUpperCase()}` : text.trim();
	}

	static extractScreenSize(text) {
		if (!text) return text;
		const match = text.match(/^\d+(\.\d+)?/);
		return match ? `${match[0]}"` : text.trim();
	}

	static extractResolution(text) {
		if (!text) return text;
		const match = text.match(/\b\d{3,4}\s?x\s?\d{3,4}\b/i);
		return match ? match[0].replace(/\s?x\s?/i, " x ") : text.trim();
	}

	static replaceVat(text) {
        return text.replace(/\b(vatov?|wattov?|watt|vat|w)\b/gi, 'W').replace(/\s+W/, ' W').trim();
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
					"Kapaciteta materiala": ElkotexAttributes.extractCapacity(val),
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
					"Kapaciteta pomnilnika": ElkotexAttributes.extractCapacity(val),
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
				: ElkotexAttributes.defaultHandler(key, value);

			Object.assign(attributes, result);
		});

		return attributes;
	}
}

export default ElkotexAttributes;
