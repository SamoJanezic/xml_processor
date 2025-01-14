import { createServer } from "http";
import { selectAll } from "./db/sql.js";
import allow from "allow-cors";

const getData = await selectAll();
const allData = JSON.stringify(getData);


const hostname = "127.0.0.1";
const port = 3000;
const server = createServer((req, res) => {
	allow(res);
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	res.end(allData);
});
server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});