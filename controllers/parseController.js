import { XMLParser} from "fast-xml-parser";
import { readFileSync } from 'fs';


export function parser(obj) {
    const xmlFile = readFileSync(`${process.cwd()}/xml/${obj.file}`, 'utf8');
    const parser = new XMLParser();
    const json = parser.parse(xmlFile);
    const products = eval(obj.nodes);  //this is data in xml as json
    return products;
}
