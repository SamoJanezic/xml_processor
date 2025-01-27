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