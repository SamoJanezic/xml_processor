import express from "express";
import allow from "allow-cors";
import routes from "./routes/routes.js";

const app = express();
const hostname = "127.0.0.1";
const port = 3000;

app.use(express.json());
app.use((req, res, next) => {
    allow(res);
    next();
});
app.use("/", routes);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// import { createServer } from "http";
// import { selectAll } from "./db/sql.js";
// import express from "express";
// import allow from "allow-cors";


// const getData = await selectAll();
// const allData = JSON.stringify(getData);


// const hostname = "127.0.0.1";
// const port = 3000;
// const server = createServer((req, res) => {
// 	allow(res);
// 	res.statusCode = 200;
// 	res.setHeader("Content-Type", "text/plain");
// 	res.end(allData);
// });


// server.listen(port, hostname, () => {
// 	console.log(`Server running at http://${hostname}:${port}/`);
// });

// import { createServer } from "http";
// import { selectAll } from "./db/sql.js";
// import allow from "allow-cors";
// import http from "http";

// const getData = await selectAll();
// const allData = JSON.stringify(getData);

// const hostname = "127.0.0.1";
// const port = 3000;
// const server = createServer((req, res) => {
//     allow(res);

//     if (req.method === "GET") {
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "text/plain");
//         res.end(allData);
//     } else if (req.method === "POST") {
//         let body = "";
//         req.on("data", chunk => {
//             body += chunk.toString();
//         });
//         req.on("end", () => {
//             // Handle the POST data here
//             console.log("Received POST data:", body);
//             res.statusCode = 200;
//             res.setHeader("Content-Type", "application/json");
//             res.end(JSON.stringify({ message: "Data received" }));
//         });
//     } else {
//         res.statusCode = 405;
//         res.setHeader("Content-Type", "text/plain");
//         res.end("Method Not Allowed");
//     }
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });