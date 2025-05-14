import express from "express";
import { IzdelekDobavitelj } from "../Models/IzdelekDobavitelj.js";
import { Kategorija } from "../Models/Kategorija.js";

const router = express.Router();

router.get("/getData", (req, res) => {
	IzdelekDobavitelj.findAll()
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			console.error(err);
		});
});

router.get("/getSingle", (req, res) => {
	IzdelekDobavitelj.findOne({
		where: { id: req.query.id },
	})
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			console.error(err);
		});
});

router.put("/update_kategorija", (req, res) => {
	const data = req.body;
	data.forEach(el => {
		Kategorija.update(
			{ marza: el.marza },
			{
				where: {
					kategorija_id: el.id,
				},
			})
	})
	res.status(200).json({ message: "Marže kategorij posodobljene." });
});

router.put("/update_izdelek", (req, res) => {
	const data = req.body;
	
	IzdelekDobavitelj.update(
		{
			KATEGORIJA_kategorija: data.KATEGORIJA_kategorija,
			izdelek_ime: data.izdelek_ime,
			opis: data.opis,
			kratki_opis: data.kratki_opis,
			dealer_cena: data.dealer_cena,
			cena_nabavna: data.nabavna_cena,
			ppc: data.ppc,
			zaloga: data.zaloga,
			aktiven: data.aktiven,
		},
		{
			where: {
				id: 1,
			},
		}
	).then(() => {
		res.status(200).json({ message: "Izdelek posodobljen." })
	}).catch((err) => {
		console.error(err);
	});
})

export default router;
