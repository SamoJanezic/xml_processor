import { XMLParser} from "fast-xml-parser";
import { readFileSync } from 'fs';


export function parser(file, nodes) {
    const xmlFile = readFileSync(`${process.cwd()}/xml/${file}`, 'utf8');
    const parser = new XMLParser();
    const json = parser.parse(xmlFile);
    const products = eval(nodes);  //this is data in xml as json
    return products;
}
