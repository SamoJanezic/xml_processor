export default class AsbisAttributes {
	constructor(category, attribute) {
		this.category = category;
		this.attribute = attribute;
	}

	formatAttributes() {
		const attributes = {};

		// console.log(this.category)

		if (this.category === "Dodatki za prenosnike") {
			attributes["Vrsta dodatka"] = "Torbe";
		}
		if (this.category === "Potrošni material") {
			if (this.attribute.hasOwnProperty("Kapaciteta") || this.attribute.hasOwnProperty("kapaciteta") || this.attribute.hasOwnProperty("Za naprave")) {
				attributes["Vrsta"] = "Črnilo";
			} else {
				attributes["Vrsta"] = "Papir";
			}
		}
		if (this.category === "Napajalniki") {
			if (this.attribute.hasOwnProperty('MOČ')) {
				this.attribute["Moč"] === attributes["MOČ"] + ' W';
			}
		}
		if (this.category === "Optične enote") {
			if (this.attribute.hasOwnProperty('Vmesnik')) {
				attributes["Vrsta optične enote"] = "Zunanja";
			} else {
				attributes["Vrsta optične enote"] = "Notranja";
			}
		}
		if (this.category === "Ohišja") {
			if (this.attribute.hasOwnProperty("Napajalnik")) {
				attributes["Napajalnik"] = this.attribute["Napajalnik"]
			}
			if (this.attribute.hasOwnProperty("Tip ohišja")) {
				attributes["Velikost"] = this.attribute["Tip ohišja"]
			}
		}
		if (this.category === "Pomnilniki") {
			if (this.attribute.hasOwnProperty("Tip")) {
				attributes["Vrsta pomnilnika"] = this.attribute["Tip"];
			}
			if (this.attribute.hasOwnProperty("Kapaciteta")) {
				attributes["Kapaciteta pomnilnika"] = this.attribute["Kapaciteta"] + 'GB'
			}
		}
		if (this.category === '') {
			
		}


		return attributes;
	}
}