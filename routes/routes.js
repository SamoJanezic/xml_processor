import express from "express";
import { selectAll, findOne, updateItem } from "../db/sql.js";
import { formatAndUpdate, readId} from "../middlewares/baseMiddleware.js";

const router = express.Router();


router.get("/getData", async (req, res) => {
	const columns = ['id', 'ean', 'kategorija', 'izdelek_ime', 'cena_nabavna', 'dealer_cena', 'ppc', 'balgovna_znamka', 'dobavitelj'];
    const getData = await selectAll('izdelki', columns);
    res.status(200).json(getData);
});

router.get("/getSingle", async (req, res) => {
	const id = readId(req.query);
	const singleData = await findOne('id', id);
	res.status(200).json(singleData);
});

router.put("/update", (req, res) => {
	res.status(200);
	// console.log(req.body.values);
	const data = formatAndUpdate(req.body.values);
	updateItem(data.id, data.arr);
	res.end("Data received");
});


export default router;