class ColbyAttributes {
    constructor(category, attribute) {
        this.category = category;
        this.attribute = attribute;
    }

    formatAttributes() {
        if (!this.attribute || !this.attribute.length) return {};

        const attributes = {};
        const handlers = attributeHandlers[this.category] || {};

        this.attribute.forEach(el => {
            const name = el['@_name'];
            const handler = handlers[name];
            const result = handler ? handler(el) : AlsoAttributes.defaultHandler(el);
            Object.assign(attributes, result);
        });

        return attributes;
    }
}

export default ColbyAttributes;