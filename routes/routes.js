import express from "express";
import { izdelek } from "../Models/test.js";

const router = express.Router();

router.get("/getData", (req, res) => {
	const columns = [
		"id",
		"ean",
		"kategorija",
		"izdelek_ime",
		"cena_nabavna",
		"dealer_cena",
		"ppc",
		"balgovna_znamka",
		"dobavitelj",
	];
	izdelek
		.findAll({
			attributes: columns,
		})
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			console.error(err);
		});
});

router.get("/getSingle", (req, res) => {
	izdelek
		.findOne({
			where: { id: req.query.id },
		})
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			console.error(err);
		});
});

router.put("/update", (req, res) => {
	izdelek
		.update(req.body.values, {
			where: { id: req.body.values.id },
		})
		.then(() => {
			res.status(200);
		})
		.catch((err) => {
			console.error(err);
		});
});

export default router;
