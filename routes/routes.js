import express from "express";
import [ modelsMap ] from "../models/index.js";

const router = express.Router();

const models = {
	modelsMap.IzdelekDobavitelj,
	modelsMap.Kategorija
}

router.get("/getData", async (req, res) => {
	console.log(req.headers);
	try {
		const table = req.headers.table;
		if (!models[table]) {
			return res.status(400).json({ error: "Invalid table name" });
    	}

		const data = await models[table].findAll();

    	res.status(200).json(data);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Server error" });
	}
});

router.get("/getSingle", (req, res) => {
	modelsMap.IzdelekDobavitelj.findOne({
		where: { id: req.headers.id },
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
		modelsMap.Kategorija.update(
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

	modelsMap.IzdelekDobavitelj.update(
		{
			KATEGORIJA_kategorija: data.KATEGORIJA_kategorija,
			izdelek_ime: data.izdelek_ime,
			izdelek_opis: data.izdelek_opis,
			izdelek_kratki_opis: data.izdelek_kratki_opis,
			dealer_cena: data.dealer_cena,
			nabavna_cena: data.nabavna_cena,
			ppc: data.ppc,
			zaloga: data.zaloga,
			aktiven: data.aktiven,
		},
		{
			where: {
				id: data.id,
			},
		}
	).then(() => {
		res.status(200).json({ message: "Izdelek posodobljen." })
	}).catch((err) => {
		console.error(err);
	});
})

router.put("/upsert", (req, res) => {

	modelsMap.IzdelekDobavitelj.upsert(
    {
      name: username,
      results: surveyData,
    },
    { name: username }
  )
    .then(data => console.log(data))
    .catch(err => console.log(err));
});

router.get("/func", (req, res) => {
	console.log(req.headers);
	res.status(200).json({ message: "Func route" });
});

export default router;
