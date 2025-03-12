import { structure } from "./structure.js";
import { build } from "./controller.js";
// import { db } from "../db/db.js";
import { softtradePodatki } from "../db/sql.js";

const result = softtradePodatki();
console.log(result);

build("../xml/softtrade.xml", structure);