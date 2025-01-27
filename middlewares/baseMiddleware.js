import { updateItem } from "../db/sql.js";

export function separateKeysAndValues(req, res) {
    if (req.body && typeof req.body === 'object') {
        const { id, ...rest } = req.body;
        req.keys = Object.keys(rest);
        req.values = Object.values(rest);
    }
}

export function test(obj) {
    let arr = [];
    let id = null;
    for (let key in obj) {
        if (key === "id") {
            id = obj.id;
        } else {
            arr.push(`"${key}" = "${obj[key]}"`);
        }
    }

    const joined = arr.join(", ");
    updateItem(id, joined);
    
}
