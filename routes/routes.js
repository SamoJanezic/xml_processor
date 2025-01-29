import express from "express";
import { selectAll, findOne } from "../db/sql.js";
import { formatAndUpdate, readId} from "../middlewares/baseMiddleware.js";

const router = express.Router();

router.post("/post", (req, res) => {
	console.log(req.body)
	res.send("POST request to the homepage");
});

router.get("/getData", async (req, res) => {
	const columns = ['id', 'ean', 'kategorija', 'izdelek_ime', 'cena_nabavna', 'dealer_cena', 'ppc', 'balgovna_znamka', 'dobavitelj'];
    const getData = await selectAll('izdelki', columns);
    res.status(200).json(getData);
});

router.delete("/delete", (req, res) => {
	console.log(req.body);
	res.status(200);
});

router.put("/put", (req, res) => {
	res.status(200);
	formatAndUpdate(req.body);
	res.end("Data received");
});

router.get("/getSingle", async (req, res) => {
	const id = readId(req.query);
	const singleData = await findOne('id', id);
	res.status(200).json(singleData);
});

export default router;