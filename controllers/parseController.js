import { XMLParser} from "fast-xml-parser";
import { readFileSync } from 'fs';

export function parser(file, nodes, encoding = 'utf8') {
    const xmlFile = readFileSync(`${process.cwd()}/xml/${file}`, encoding);
    const options = {
        ignoreAttributes: false,
        attributeNamePrefix : "@_"
    };
    const parser = new XMLParser(options);
    const json = parser.parse(xmlFile);
    const output = eval(nodes);
    return output;
}