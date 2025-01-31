import express from "express";
import allow from "allow-cors";
import routes from "./routes/routes.js";

const app = express();
const hostname = "127.0.0.1";
const port = 3000;

app.use(express.json());
app.use((req, res, next) => {
    allow(res);
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

app.use("/", routes);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});