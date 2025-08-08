import { parser } from "./parseController.js";
import DobaviteljController from "./DobaviteljController.js";

export class BshController extends DobaviteljController {
	constructor(categoryMap, ...args) {
		super(...args);
		this.categoryMap = categoryMap
	}
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
				const skupina = product.PIData?.PIProperties?.PIProperty?.find(
					(property) =>
						property["@_description"] === "Skupina izdelkov"
				);
				if (skupina) {
					obj[vrstica[idx]] = skupina["#text"];
				}
				break;

			case "eprel_id":
				// getEprel(product);
				product?.PIData?.PIProperties?.PIProperty?.forEach(
					(property) => {
						if (property["@_name"] === "QR_CODE_2017") {
							const eprelId = property["#text"].match(/(\d+)/);
							obj[vrstica[idx]] = eprelId[1] || null;
						}
					}
				);
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
		const ignoreCategory = [
			"Da - vse s sprednje strani",
			"noData",
			"Vzporedno",
			"Grelnik krožnikov",
			"Pribor",
		];

		return param.PIData?.PIProperties?.PIProperty?.some((property) => {
			return (
				property["@_description"] === "Skupina izdelkov" &&
				ignoreCategory.includes(property["#text"])
			);
		});
	}

	sortCategories() {
		const flatCategoryMap = {};

		for (const [newCategory, oldCategories] of Object.entries(this.categoryMap)) {
			oldCategories.forEach(old => {
				flatCategoryMap[old] = newCategory;
			});
		}

		this.allData.forEach((el) => {
			if (flatCategoryMap[el.kategorija]) {
				el.kategorija = flatCategoryMap[el.kategorija];
			}
		});
	}

	splitDodatneLastnosti() {
		let lastnosti = [];

		this.allData.forEach((data) => {
			if (data.dodatne_lastnosti.length) {
				data.dodatne_lastnosti.forEach((el) => {
					if (el["#text"] !== "noData") {
						lastnosti.push({
							ean: data.ean,
							kategorija: data.kategorija,
							lastnostNaziv: el["@_description"],
							lastnostVrednost: el["#text"],
						});
					}
				});
			}

			this.komponenta = lastnosti.map((el) => {
				return {
					KATEGORIJA_kategorija: el.kategorija,
					komponenta: el.lastnostNaziv,
				};
			});
			this.atribut = lastnosti.map((el) => {
				return {
					izdelek_ean: el.ean,
					KOMPONENTA_komponenta: el.lastnostNaziv,
					atribut: el.lastnostVrednost,
				};
			});
		});
	}

	splitSlike() {
		this.slika = [];
		this.allData.forEach((data) => {
			if (data.slika_mala) {
				this.slika.push({
					izdelek_ean: data.ean,
					slika_url: data.slika_mala,
					tip: "mala",
				});
			}
			if (data.slika_velika) {
				this.slika.push({
					izdelek_ean: data.ean,
					slika_url: data.slika_velika,
					tip: "velika",
				});
			}
			if (data.dodatne_slike.length) {
				data.dodatne_slike.forEach((el) => {
					this.slika.push({
						izdelek_ean: data.ean,
						slika_url: el,
						tip: "dodatna",
					});
				});
			}
		});
	}

	formatZaloga(zaloga) {
		return zaloga > 0 ? "Na zalogi" : "Ni na zalogi";
	}

	executeAll() {
		this.createDataObject();
		this.sortCategories();
		this.splitDodatneLastnosti();
		this.splitSlike();
		this.insertDataIntoDb();
	}
}
