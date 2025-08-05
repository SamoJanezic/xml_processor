import { parser } from "./parseController.js";
import dobaviteljController from "./dobaviteljController.js";

export class bshController extends dobaviteljController {
	name = "BSH";
	file = [
		{
			fileName: "BSH_opisi.xml",
			node: "TradeplaceMessage.BusinessMessage.CatalogDownloadReply.CatalogDownloadReplyItems.Product",
		},
		{ fileName: "BSH_cene.xml", node: "izdelki.izdelek" },
	];
	encoding = "utf8";
	keys = [
		"ean",
		"sifra",
		"kratki_opis",
		"opis",
		"cena",
		"niPodatka",
		"ppc",
		"davek",
		"OtherData.LowResolutionPictureName",
		"OtherData.HighResolutionPictureName",
		"niPodatka",
		"niPodatka",
		"brand",
		"niPodatka",
		"eprel",
		"zaloga",
	];

	combineData() {
		const combinedData = [];
		const opisi = parser(
			this.file[0].fileName,
			this.file[0].node,
			this.encoding
		);
		const cene = parser(
			this.file[1].fileName,
			this.file[1].node,
			this.encoding
		);
		opisi.forEach((opis) => {
			cene.forEach((cena) => {
				if (opis.PIData.EANArticleCode === cena.ean) {
					combinedData.push({ ...opis, ...cena });
				}
			});
		});

		return combinedData;
	}

	keyRules(obj, product, key, idx, vrstica) {
		switch (vrstica[idx]) {
			case "kratki_opis":
				product.PIData.PIProperties.PIProperty.forEach((property) => {
					if (property["@_name"] === "SHORT_DESCRIPTION") {
						obj[vrstica[idx]] = property["#text"];
					}
				});
				break;

			case "opis":
				product.PIData.PIProperties.PIProperty.forEach((property) => {
					if (property["@_name"] === "LONG_DESCRIPTION") {
						obj[vrstica[idx]] = property["#text"];
					}
				});
				break;

			case "slika_mala":
				obj[vrstica[idx]] = product.OtherData.LowResolutionPictureName;
				break;

			case "slika_velika":
				obj[vrstica[idx]] = product.OtherData.HighResolutionPictureName;
				break;

			case "dodatne_slike":
				obj[vrstica[idx]] = [];
				if (product.OtherData?.Assets?.Asset?.length) {
					product.OtherData.Assets.Asset.forEach((asset) => {
						if (
							asset.AssetProperty[0]["#text"] ===
							"additional picture"
						) {
							asset.AssetProperty.forEach((property) => {
								if (property["@_name"] === "identifier") {
									obj[vrstica[idx]].push(property["#text"]);
								}
							});
						}
					});
				}
				break;

			case "dodatne_lastnosti":
				obj[vrstica[idx]] = product.PIData.PIProperties.PIProperty;
				break;

			case "blagovna_znamka":
				obj[vrstica[idx]] = product.PIData.Brand;
				break;

			case "kategorija":
				product.PIData?.PIProperties?.PIProperty?.forEach((property) => {
					if (property["@_description"] === "Skupina izdelkov") {
						obj[vrstica[idx]] = property["#text"];
					}
				});
				break;

			case "eprel_id":
				// getEprel(product);
				product?.PIData?.PIProperties?.PIProperty?.forEach(property => {
					if (property["@_name"] === "QR_CODE_2017") {
						const eprelId = property['#text'].match(/(\d+)/)
						obj[vrstica[idx]] = eprelId[1] || null
					}
				})
				break;

			case "zaloga":
				obj[vrstica[idx]] = this.formatZaloga(product.zaloga);
				break;

			case "cena_nabavna":
				obj[vrstica[idx]] = product.cena.replace(",", ".");
				break;

			case "ppc":
				obj[vrstica[idx]] = product.ppc.replace(",", ".");
				break;

			default:
				obj[vrstica[idx]] = product[key] ?? null;
				break;
		}

		return obj;
	}

	exceptions(param) {
		const ignoreCategory = [];
		if (ignoreCategory.includes(param)) {
			return true;
		}
	}


	// sortCategories() {}

	splitDodatneLastnosti() {
		let lastnosti = [];

		this.allData.forEach((data) => {
			console.log(data)
			lastnosti.push({ean: data.ean, kategorija: data.kategorija, lastnostNaziv: 'Proizvajalec', lastnostVrednost: data.blagovna_znamka});

			this.komponenta = lastnosti.map(el => { return {KATEGORIJA_kategorija: el.kategorija, komponenta: el.lastnostNaziv}});
			this.atribut = lastnosti.map(el => { return {izdelek_ean: el.ean, KOMPONENTA_komponenta:el.lastnostNaziv, atribut: el.lastnostVrednost}});
		});
	}

	// splitSlike() {}

	// getEprel() {}

	formatZaloga(zaloga) {
		return zaloga > 0 ? "Na zalogi" : "Ni na zalogi";
	}

	executeAll() {
		this.createDataObject();
		this.splitDodatneLastnosti();
		this.insertDataIntoDb();
	}
}