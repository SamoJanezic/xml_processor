import express from "express";
import { selectAll, deleteItem } from "../db/sql.js";
import { separateKeysAndValues, test } from "../middlewares/baseMiddleware.js";

const getData = await selectAll();
const allData = JSON.stringify(getData);

const router = express.Router();

router.get("/", (req, res) => {
	res.statusCode = 200;
	res.send("GET request to the homepage");
	res.setHeader("Content-Type", "text/plain");
    res.end(allData);
});

router.post("/post", (req, res) => {
	console.log(req.body)
	res.send("POST request to the homepage");
});

router.get("/getData", async (req, res) => {
    const getData = await selectAll();
    res.status(200).json(getData);
});

router.post("/", (req, res) => {
    const postData = req.body;
	res.setHeader("Content-Type", "application/json");
	console.log("Received POST data:", postData);
    res.status(400).json({ message: "Data received"});
});

router.delete("/delete", (req, res) => {
	console.log(req.body);
	res.status(200);
});

router.put("/put", (req, res) => {
	res.status(200);
	test(req.body);
	res.end("Data received");
});


export default router;