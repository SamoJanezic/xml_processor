import dobaviteljController from "./DobaviteljController.js";

export class LiebherrController extends dobaviteljController {
	constructor(categoryMap, Attributes, ...args) {
		super(...args);
		this.categoryMap = categoryMap;
		this.Attributes = Attributes;
	}
	name = "Liebherr";
	nodes = "Export.LeaveNode.LeaveNode";
	file = "liebherr.xml";
	encoding = "utf8";

	exceptions(param) {
		const ignoreCategory = []
	}

	createDataObject() {
		const leaveNodes = this.getData()?.[1]?.LeaveNode ?? [];

		const getData = leaveNodes
			.flatMap(node => node.LeaveNode || [])
			.map(node => node.Appliance)
			.filter(Boolean)
			.flat();

		getData.forEach(product => {
			this.keyRules(product)
		})
	}

	keyRules(prod) {
		const eprel = this.getEprel(prod);
		const images = this.getImages(prod.FMT);

		const defaults = {
			kratki_opis: null,
			opis: null,
			cena_nabavna: null,
			dealer_cena: null,
			ppc: null,
			davcna_stopnja: 22,
			dodatne_lastnosti: null,
			blagovna_znamka: "Liebherr",
			zaloga: "preveriti",
		};

		this.allData.push({
			...defaults,
			ean: prod['@_id'],
			izdelek_ime: prod['@_name'],
			slika_mala: images[0],
			slika_velika: images[0],
			dodatne_slike: images,
			kategorija: prod['@_type'],
			eprel_id: eprel.length ? eprel : null,
		});
	}

	getImages(fmtArray) {
		if (!Array.isArray(fmtArray)) {
			console.warn('Expected an array of FMT blocks');
			return [];
		}

		const assetDataBlock = fmtArray.find(f => f['@_name'] === 'Asset Data');
		if (!assetDataBlock || !assetDataBlock.AttributeGroup) {
			console.warn('Asset Data block not found or has no AttributeGroup');
			return [];
		}

		const groups = Array.isArray(assetDataBlock.AttributeGroup)
			? assetDataBlock.AttributeGroup.filter(Boolean)
			: [assetDataBlock.AttributeGroup];

		const galleryGroup = groups.find(g => g['@_name'] === 'product_gallery');
		if (!galleryGroup || !galleryGroup.Attribute) {
			console.warn('product_gallery not found in Asset Data');
			return [];
		}

		const attributes = Array.isArray(galleryGroup.Attribute)
			? galleryGroup.Attribute.filter(Boolean)
			: [galleryGroup.Attribute];

		return attributes
			.map(attr => attr.FormattedValue)
			.filter(Boolean);
	}

	getEprel(fmt) {
		if (!fmt?.FMT) return [];

		const assetDataGroup = fmt.FMT.find(
			g => g['@_id'] === '2' && g['@_name'] === 'Asset Data'
		);
		if (!assetDataGroup || !Array.isArray(assetDataGroup.AttributeGroup)) return [];

		const productDatasheets = assetDataGroup.AttributeGroup.find(
			g => g['@_name'] === 'product_datasheets'
		);
		if (!productDatasheets || !productDatasheets.Attribute) return [];

		const attrs = Array.isArray(productDatasheets.Attribute)
			? productDatasheets.Attribute
			: [productDatasheets.Attribute];

		const ids = [];
		attrs.forEach(item => {
			const attr = item.Attribute || item;
			if (attr['@_name'] === 'eu_product_fiche') {
			ids.push(attr['@_id']);
			}
		});
		return ids[0];
	}

	sortCategories() {
		// console.log(this.allData)
	}

	parseObject(obj) {}

	splitDodatneLastnosti() {}

	splitSlike() {}

	executeAll() {
		this.createDataObject();
		this.processAllData();
		this.insertDataIntoDb();
	}
}