import { XMLParser} from "fast-xml-parser";
import { readFileSync } from 'fs';
import * as windows1250 from 'windows-1250';

export function parser(file, nodes, encoding = 'utf8') {
    let xmlFile;
    encoding === 'windows1250' ? xmlFile = windows1250.decode(readFileSync(`${process.cwd()}/xml/${file}`)) : xmlFile = readFileSync(`${process.cwd()}/xml/${file}`, encoding);
    const options = {
        ignoreAttributes: false,
        attributeNamePrefix : "@_",
        numberParseOptions: {
            leadingZeros: false,
        }
    };
    const parser = new XMLParser(options);
    const json = parser.parse(xmlFile);
    const output = getValue(json, nodes);
    return output;
}

function getValue(obj, path) {
    if (!path) return obj;
    const properties = path.split('.');
    return getValue(obj[properties.shift()], properties.join('.'))
}