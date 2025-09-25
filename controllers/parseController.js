import { XMLParser } from "fast-xml-parser";
import { readFileSync } from "fs";
import * as windows1250 from "windows-1250";
import readXlsxFile from "read-excel-file/node";

export function xmlParser(file, nodes, encoding = "utf8") {
	let xmlFile;
	encoding === "windows1250"
		? (xmlFile = windows1250.decode(
				readFileSync(`${process.cwd()}/xml/${file}`)
		  ))
		: (xmlFile = readFileSync(`${process.cwd()}/xml/${file}`, encoding));
	const options = {
		ignoreAttributes: false,
		attributeNamePrefix: "@_",
		numberParseOptions: {
			leadingZeros: false,
		},
	};
	const parser = new XMLParser(options);
	const json = parser.parse(xmlFile);
	const output = getValue(json, nodes);
	return output;
}

function getValue(obj, path) {
	if (!path) return obj;
	const properties = path.split(".");
	return getValue(obj[properties.shift()], properties.join("."));
}

const rows = await readXlsxFile("./xml/cenikliebherr2025.xlsx");

const columns = rows[3];

// console.log(columns);

export async function excelParser(filePath) {
	const rows = await readXlsxFile(filePath);
	const headers = rows[3];
	const dataRows = rows.slice(4);
	const data = dataRows.map((row) => {
		const obj = {};
		headers.forEach((header, idx) => {
			if (header) {
				obj[header] = row[idx];
			}
		});
		return obj;
	});
	return data;
}

// Usage
// const records = await excelParser("./xml/cenikliebherr2025.xlsx");
// console.log(records);
