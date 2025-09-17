class BaseAttributes {
	// Normalize keys: lowercase all except first letter
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
}

export default BaseAttributes;