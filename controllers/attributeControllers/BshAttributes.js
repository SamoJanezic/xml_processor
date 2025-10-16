class BshAttributes {
	constructor(category, attribute) {
		this.attribute = attribute;
        this.category = category;
	}

	formatAttributes() {
		// if (this.category === "Hladilniki") {
		// 	console.log(this.attribute)
		// 	console.log('-------------------------------------------')
		// }
		const attributeHandlers = {
			Hladilniki: {
				Tip: el => ({}),
				Vrsta: el => ({}),
				"Energijski razred": el => ({}),
				"No frost": el => ({}),
				Višina: el => ({}),
				Širina: el => ({}),
				"Položaj zamrzovalnika": el => ({}),
				"Število vrat": el => ({}),
			},
			Zamrzovalniki: {
				Tip: el => ({}),
				Prostornina: el => ({}),
				"Energijski razred": el => ({}),
				"No frost": el => ({}),
				Višina: el => ({}),
				Širina: el => ({}),
			}
		}
	}
}

export default BshAttributes;