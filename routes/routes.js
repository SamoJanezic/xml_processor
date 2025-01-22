import express from "express";
import { selectAll, deleteItem } from "../db/sql.js";

const getData = await selectAll();
const allData = JSON.stringify(getData);

const router = express.Router();

router.get("/", (req, res) => {
	res.send("GET request to the homepage");
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
	if(Object.keys(postData).length === 0){
		console.log("No data received");
		res.status(204).json({ message: "No Data received"});
		return;
	}
	console.log("Received POST data:", postData);
    res.status(200).json({ message: "Data received"});
});

router.delete("/delete", (req, res) => {
	console.log(req.body);
	res.status(200);
});

export default router;