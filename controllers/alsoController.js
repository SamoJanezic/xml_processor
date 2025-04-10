import dobaviteljController from "./dobaviteljController.js";

export class alsoController extends dobaviteljController {
	name = "also";
	nodes = "json.xmlData.product";
	file = "also.xml";
	encoding = "utf8";
	keys = [
		"product['@_id']",
		"product.idents.ident[2]['@_value']",
		"product.base.name",
		"product.base.longname",
		"product.attributes.marketingtext['#text']",
		"product.prices.price[0]['@_value']",
		"product.prices.price[1]['@_value']",
		"product.prices.price[2]['@_value']",
		"product.prices.tax['@_rate']",
		"niPodatka",
		"niPodatka",
		"product.pictures.picture",
		"product.attributes.specification",
		"product.base.vendor['#text']",
		"product.base.categoryName['#text']",
		"product.eprel",
		"product.stock.quantity['#text']",
	];

	keyRules(obj, product, key, idx, vrstica) {
		if (vrstica[idx] === "zaloga") {
			obj[vrstica[idx]] = this.formatZaloga(eval(key));
		} else if (key === "niPodatka" || eval(key) === "" || !eval(key)) {
			obj[vrstica[idx]] = null;
		} else {
			obj[vrstica[idx]] = eval(key);
		}
		return obj;
	}

	exceptions(param) {
		const ignoreCategory = [
			" /  / ",
			"Garancije & storitve / Garancije & podpora / Garancija za UPS",
			"Garancije & storitve / Garancije & podpora / Garancije za prenosnike",
			"Garancije & storitve / Garancije & podpora / Garancije za PC",
			"Garancije & storitve / Garancije & podpora / Garancije za monitorje",
			"Garancije & storitve / Garancije & podpora / Printer & MFP garancije",
			"Avdio, video, monitorji & TV / Dodatki / Avdio, video adapterji & kabli",
			"Garancije & storitve / Garancije & podpora / Garancije za mrežno opremo",
			"Garancije & storitve / Garancije & podpora / Garancije za sistem konferenc",
			"Garancije & storitve / Garancije & podpora / Garancije tiskalnika velikega formata",
			"Garancije & storitve / Garancije & podpora / Garancije za skenerje",
			"Garancije & storitve / Garancije & podpora / Strežniške garancije",
			"Garancije & storitve / Garancije & podpora / Garancije za digitalno podpisovanje",
			"Garancije & storitve / Garancije & podpora / Garancije projektorjev",
			"Omrežje & Smart Home / Omrežna dodatna oprema / Omrežni & DAC kabli",
			"Izdelki za električno energijo / Akumulator / Akumulator",
			"Izdelki za električno energijo / Paneli / Paneli",
			"Periferija & dodatki / Kabli & adapterji / Adapterji",
			"Periferija & dodatki / Kabli & adapterji / Kabli - Drugi",
			"Periferija & dodatki / Kabli & adapterji / Kabli - Ključavnice",
			"Periferija & dodatki / Kabli & adapterji / Kabli - Napajanje",
			"Periferija & dodatki / Kabli & adapterji / Kabli - USB & Thunderbolt",
			"Periferija & dodatki / Kabli & adapterji / USB razdelilci",
			"Komponente / Krmilniki / Adapterji (HBA)",
			"Avdio, video, monitorji & TV / Dodatki / Filtri zasebnosti",
			"Avdio, video, monitorji & TV / Dodatki / Avdio & video dodatki",
			"Avdio, video, monitorji & TV / Dodatki / Kamere, Droni, Spletne kamere - Baterije",
		];
		if (
			(param.prices.price[0]["@_value"] ||
				param.prices.price[1]["@_value"] ||
				param.prices.price[2]["@_value"]) === "0"
		) {
			return true;
		}
		if (ignoreCategory.includes(param["base"]["categoryName"]["#text"])) {
			return true;
		}
		if (param["@_id"] === "23370") {
			return true;
		}
	}

	sortCategories() {
		this.allData.forEach((el) => {
			switch (el.kategorija) {
				case "Tiskanje, optično branje & potrošni mat. / Potrošni material - Papir / Papirji velikega formata":
				case "Tiskanje, optično branje & potrošni mat. / Potrošni material - Papir / Office & Foto papirji":
				case "Tiskanje, optično branje & potrošni mat. / Potrošni material - Črnila / Ink črnila & glave":
				case "Tiskanje, optično branje & potrošni mat. / Potrošni material - Laser / Tonerji":
				case "Tiskanje, optično branje & potrošni mat. / Potrošni material - matrični tiskalnik / Trakovi":
				case "Tiskanje, optično branje & potrošni mat. / Potrošni material - Laser / Laserski bobni":
				case "Tiskanje, optično branje & potrošni mat. / Potrošni material - Tiskalnik nalepk / Trakovi & etikete":
				case "Tiskanje, optično branje & potrošni mat. / Potrošni material - Laser / Transfer Belt Units & Kits":
				case "Tiskanje, optično branje & potrošni mat. / Potrošni material - tiskalniki velikega / LFP Inks & LFP glave":
				case "Tiskanje, optično branje & potrošni mat. / Potrošni material - Laser / Odpadne toner škatle":
				case "Tiskanje, optično branje & potrošni mat. / Potrošni material - tiskalniki velikega / LFP Vzdrževanje & čistilni kompleti":
				case "Tiskanje, optično branje & potrošni mat. / Potrošni material - Laser / Laserski kompleti za vzdrževanje":
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki, optični bralnik, dodatna opr / Pribor za tiskalnike - drugo":
				case "Tiskanje, optično branje & potrošni mat. / Potrošni material - Papir / Nalepke, računi & matrika":
				case "Tiskanje, optično branje & potrošni mat. / Potrošni material - Laser / Kompleti za varovalke tiskalnika":
				case "Tiskanje, optično branje & potrošni mat. / Potrošni material - Laser / Laserski fotoprevodniki":
				case "Tiskanje, optično branje & potrošni mat. / Potrošni material - Papir / Nalepke, računi & matrika":
				case "Tiskanje, optično branje & potrošni mat. / Potrošni material - Laser / Sponke":
				case "Tiskanje, optično branje & potrošni mat. / Potrošni material - Črnila / Stekleničke & ostali dodatki":
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki, optični bralnik, dodatna opr / Sponke":
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki, optični bralnik, dodatna opr / Pladnji":
					el.kategorija = "Potrošni material";
					break;
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki velikega formata (LFP) / Ploterji & skenerji":
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Laserski enobarvni tiskalniki":
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Laserski barvni tiskalniki":
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Matrični tiskalniki":
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Tiskalniki nalepk":
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Večnamenski laserski barvni tiskalniki":
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Ink tiskalniki":
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki velikega formata (LFP) / Dodatna oprema za velike formate":
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Večnamenski laserski tiskalniki":
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Tiskalniki nalepk":
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Večnamenski laserski barvni tiskalniki":
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Ink tiskalniki":
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki, optični bralnik, dodatna opr / Stojala":
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki, optični bralnik, dodatna opr / Dodatki za matrične tiskalnike":
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Tiskalniki - mobilni":
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Foto tiskalniki":
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Večnamenski ink tiskalniki":
				case "Tiskanje, optično branje & potrošni mat. / Kopiranje & faks / Oprema za kopiranje in telefaks":
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki, optični bralnik, dodatna opr / Napajalniki":
					el.kategorija = "Tiskalniki";
					break;
				case "Tiskanje, optično branje & potrošni mat. / Optični bralniki / Optični bralniki dokumentov":
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki, optični bralnik, dodatna opr / Dodatki za skenerje - drugo":
				case "Tiskanje, optično branje & potrošni mat. / Optični bralniki / Skenerji - mobilni":
				case "Tiskanje, optično branje & potrošni mat. / Optični bralniki / Optični bralniki fotografij":
					el.kategorija = "Optični bralniki";
					break;
				case "Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / POS tiskalniki":
				case "Pisarniška oprema / Pisarniška oprema / Mala pisarniška oprema":
				case "Pisarniška oprema / Pisarniška oprema / Baterije & polnilci":
				case "Prenosniki, PC & Tablični računalniki / Dodatki / Dodatki za POS":
					el.kategorija = "POS in dodatki";
					break;
				case "Strežniki, diskovna polja & UPS / Dodatki / Dodatki za Rack omare":
				case "Strežniki, diskovna polja & UPS / Rack omare / Rack omare":
				case "Strežniki, diskovna polja & UPS / Diskovna polja / Tape":
				case "Strežniki, diskovna polja & UPS / Razdelilci (PDU) / Osnovni PDU":
				case "Strežniki, diskovna polja & UPS / Razdelilci (PDU) / Switched PDU":
				case "Strežniki, diskovna polja & UPS / Razdelilci (PDU) / Metered PDU":
				case "Strežniki, diskovna polja & UPS / Dodatki / Strežnik, pomnilnik - Ostala dodatna opr":
				case "Strežniki, diskovna polja & UPS / Strežniki / Rack strežniki":
				case "Strežniki, diskovna polja & UPS / Diskovna polja / Strežnik HDD":
				case "Strežniki, diskovna polja & UPS / Diskovna polja / Strežnik SSD":
				case "Strežniki, diskovna polja & UPS / Diskovna polja / JBOD & SANs":
				case "Strežniki, diskovna polja & UPS / Strežniki / Tower strežniki":
				case "Periferija & dodatki / KVM / Dodatki KVM":
				case "Komponente / Krmilniki / Raid krmlniki":
					el.kategorija = "Strežniki";
					break;
				case "Strežniki, diskovna polja & UPS / Brezprekinitveno napajanje (UPS) / Line Interactive Rack mounts":
				case "Strežniki, diskovna polja & UPS / Brezprekinitveno napajanje (UPS) / Line Interactive Tower":
				case "Strežniki, diskovna polja & UPS / Dodatki / UPS dodatki & baterije":
				case "Strežniki, diskovna polja & UPS / Brezprekinitveno napajanje (UPS) / Off Line UPS":
				case "Strežniki, diskovna polja & UPS / Brezprekinitveno napajanje (UPS) / Online Rack mounts":
				case "Strežniki, diskovna polja & UPS / Brezprekinitveno napajanje (UPS) / Online Towers":
					el.kategorija = "UPS";
					break;
				case "Programska oprema & oblak / Pisarniška programska oprema / Zbirke officeovih aplikacij":
				case "Programska oprema & oblak / Strežniška programska oprema & licence / Strežniško programsko opremo":
				case "Programska oprema & oblak / Operacijski sistemi / Programska oprema Microsoft Windows":
				case "Programska oprema & oblak / Business & Productivity Software / Programska oprema Databases & Tools":
				case "Programska oprema & oblak / Razvojna orodja / Programska oprema za razvijalce":
				case "Programska oprema & oblak / Business & Productivity Software / Data Analysis & Content Mgmt Software":
				case "Programska oprema & oblak / Strežniška programska oprema & licence / Strežnik CAL":
				case "Programska oprema & oblak / Omrežna programska oprema / Programska oprema za spletne konference":
				case "Programska oprema & oblak / Naročnine zaa programsko opremo / Programska oprema za naročnine na OS":
				case "Programska oprema & oblak / Mac programska oprema / Antivirus & varnost":
				case "Programska oprema & oblak / Protivirusna programska oprema / Protivirusna programska oprema":
				case "Programska oprema & oblak / Protivirusna programska oprema / Programska oprema varnostnih apartmajev":
				case "Avdio, video, monitorji & TV / Public Display & Signage / Programska oprema za signage":
					el.kategorija = "Programska oprema";
					break;
				case "Komponente / Optični pogoni / Blu-Ray, CD/DVD pogoni":
					el.kategorija = "Optične enote";
					break;
				case "Periferija & dodatki / Miške / Miške - Žične":
				case "Periferija & dodatki / Miške / Miške - Brezžične":
					el.kategorija = "Miške";
					break;
				case "Avdio, video, monitorji & TV / Dodatki / Kamere - Dodatna oprema":
					el.kategorija = "Kamere";
					break;
				case "Avdio, video, monitorji & TV / Slušalke & mikrofoni / Consumer & Gaming slušalke":
				case "Avdio, video, monitorji & TV / Slušalke & mikrofoni / Poslovne slušalke":
				case "Avdio, video, monitorji & TV / Slušalke & mikrofoni / Mikrofoni & diktafoni":
				case "Avdio, video, monitorji & TV / Dodatki / Slušalke & mikrofoni - dodatki":
				case "Telefonija & Pametne naprave / Dodatki za pametne telefone / Pametni telefoni - Slušalke":
					el.kategorija = "Slušalke";
					break;
				case "Avdio, video, monitorji & TV / Monitorji / Poslovni monitorji":
				case "Avdio, video, monitorji & TV / Monitorji / Consumer monitorji":
				case "Gaming / Gaming monitorji / Gaming monitorji":
					el.kategorija = "Monitorji";
					break;
				case "Avdio, video, monitorji & TV / Oprema za projektorje / Montaža projektorja":
					el.kategorija = "Nosilci za projektorje";
					break;
				case "Avdio, video, monitorji & TV / Oprema za projektorje / Projektorji - Dodatki":
				case "Avdio, video, monitorji & TV / Oprema za projektorje / Dodatki za projektorje - drugo":
					el.kategorija = "Projekcijska platna";
					break;
				case "Avdio, video, monitorji & TV / Projektorji / Ostali projektorji":
				case "Avdio, video, monitorji & TV / Projektorji / Poslovni projektorji":
				case "Avdio, video, monitorji & TV / Projektorji / Consumer projektorji":
				case "Avdio, video, monitorji & TV / Oprema za projektorje / Objektivi":
				case "Izobraževanje / Predstavitev EDU / Projektor EDU":
					el.kategorija = "Projektorji";
					break;
				case "Avdio, video, monitorji & TV / Public Display & Signage / Hotelski TV":
				case "Avdio, video, monitorji & TV / Televizorji / TV":
				case "Avdio, video, monitorji & TV / Public Display & Signage / Digitalni zasloni na dotik":
				case "Avdio, video, monitorji & TV / Public Display & Signage / Zunanji digitalni zasloni":
				case "Avdio, video, monitorji & TV / Public Display & Signage / Digitalni zasloni":
					el.kategorija = "Televizije";
					break;
				case "Avdio, video, monitorji & TV / Zvočniki / PC zvočniki & Sound Bar":
				case "Avdio, video, monitorji & TV / Zvočniki / Prenosni & brezžični zvočniki":
				case "Avdio, video, monitorji & TV / Avdio & video sistemi / Digitalni AV sistemi":
					el.kategorija = "HI-FI in prenosni zvočniki";
					break;
				case "Avdio, video, monitorji & TV / Dodatki / Nosilci - Stojalo za mizo":
				case "Avdio, video, monitorji & TV / Dodatki / Nosilci - Video stena":
				case "Avdio, video, monitorji & TV / Dodatki / Nosilci - Stena":
				case "Avdio, video, monitorji & TV / Dodatki / Nosilci - drugo":
					el.kategorija = "Nosilci za TV";
					break;
				case "Avdio, video, monitorji & TV / Kamere & optični sistemi / Spletne kamere":
					el.kategorija = "Spletne kamere";
					break;
				case "Avdio, video, monitorji & TV / Kamere & optični sistemi / Digitalni fotoaparati":
					el.kategorija = "Fotoaparati";
					break;
				case "Omrežje & Smart Home / Omrežna dodatna oprema / Mrežne kartice & adapterji":
					el.kategorija = "Mrežne kartice, antene, WIFI ojačevalci";
					break;
				case "Omrežje & Smart Home / Mrežna oprema / Usmerjevalniki":
				case "Omrežje & Smart Home / Mrežna oprema / Stikala - CLI managed":
				case "Omrežje & Smart Home / Mrežna oprema / Stikala - PoE":
				case "Omrežje & Smart Home / Mrežna oprema / Stikala – neupravljano":
				case "Omrežje & Smart Home / Mrežna oprema / Stikala – upravljano s spletom":
				case "Omrežje & Smart Home / Mrežna oprema / Dostopne točke & kontrolerji":
				case "Omrežje & Smart Home / Mrežna oprema / Požarni zidovi":
				case "Periferija & dodatki / KVM / Stikala KVM":
					el.kategorija = "Usmerjevalniki, stikala in AP";
					break;
				case "Omrežje & Smart Home / Omrežna dodatna oprema / Omrežni napajalniki":
				case "Omrežje & Smart Home / Omrežna dodatna oprema / Omrežje - Drugi dodatki":
				case "Omrežje & Smart Home / Smart Home / Pametna zaščita":
					el.kategorija = "Naprave za pametni dom";
					break;
				case "Komponente / Matične plošče / Matične plošče - INTEL":
				case "Komponente / Matične plošče / Matične plošče - AMD":
					el.kategorija = "Osnovne plošče";
					break;
				case "Komponente / Shranjevanje podatkov / Notranji diski (HDD)":
				case "Komponente / Shranjevanje podatkov / Zunanji diski (HDD)":
				case "Komponente / Shranjevanje podatkov / Notranji diski (SSD)":
				case "Komponente / Shranjevanje podatkov / Zunanji diski (SSD)":
				case "Komponente / Dodatki za komponente / Dodatki za shranjevanje":
					el.kategorija = "Trdi diski";
					break;
				case "Komponente / Dodatki za komponente / Dodatki za komponente - drugo":
				case "Komponente / Ventilatorji & hladilni sistemi / Računalniški ventilatorji":
				case "Komponente / Ventilatorji & hladilni sistemi / Ventilatorji & hladilni sistemi":
					el.kategorija = "Hlajenje";
					break;
				case "Komponente / Napajalniki (PSU) / Napajalniki za strežnike":
				case "Komponente / Napajalniki (PSU) / Napajalniki za računalnike":
					el.kategorija = "Napajalniki";
					break;
				case "Komponente / Pomnilnik / Delovni pomnilnik za prenosnike":
				case "Komponente / Pomnilnik / Delovni pomnilnik za strežnike":
				case "Komponente / Pomnilnik / Delovni pomnilnik za PC":
					el.kategorija = "Pomnilniki";
					break;
				case "Komponente / Procesorji (CPU) / Procesorji za strežnike":
					el.kategorija = "Procesorji";
					break;
				case "Komponente / Grafične kartice (GPU) / Grafične kartice - Delovne postaje":
					el.kategorija = "Grafične kartice";
					break;
				case "Komponente / Pomnilnik / Flash pomnilnik":
					el.kategorija = "Spominske kartice in čitalci";
					break;
				case "Komponente / Pomnilnik / USB pomnilnik":
					el.kategorija = "USB ključki";
					break;
				case "Prenosniki, PC & Tablični računalniki / Osebni računalniki (PC) / Delovne postaje":
				case "Prenosniki, PC & Tablični računalniki / Osebni računalniki (PC) / Terminali & Tanki odjemalci":
				case "Prenosniki, PC & Tablični računalniki / Prenosniki / Poslovni prenosniki":
				case "Prenosniki, PC & Tablični računalniki / Prenosniki / Consumer prenosniki":
				case "Prenosniki, PC & Tablični računalniki / Prenosniki / Mobilne delovne postaje":
					el.kategorija = "Prenosniki";
					break;
				case "Prenosniki, PC & Tablični računalniki / Tablični računalniki / Tablični računalniki - Windows":
				case "Prenosniki, PC & Tablični računalniki / Tablični računalniki / Tablični računalniki - Android":
					el.kategorija = "Tablični računalniki";
					break;
				case "Prenosniki, PC & Tablični računalniki / Osebni računalniki (PC) / All in one PC":
					el.kategorija = "AIO";
					break;
				case "Prenosniki, PC & Tablični računalniki / Dodatki / Priklopne postaje za prenosnike":
				case "Periferija & dodatki / Tipkovnice / Tipkovnice - Brezžične":
				case "Periferija & dodatki / Tipkovnice / Tipkovnice - Žične":
					el.kategorija = "Tipkovnice";
					break;
				case "Periferija & dodatki / Kompleti / Miška & tipkovnica - Brezžično":
				case "Periferija & dodatki / Kompleti / Miška & tipkovnica - Žične":
				case "Gaming / Gaming dodatki / Gaming miške & tipkovnice":
					el.kategorija = "Kompleti";
					break;
				case "Periferija & dodatki / Miške / Prezenterji":
				case "Periferija & dodatki / Miške / Miške":
				case "Periferija & dodatki / Miške / Miške - Ergonomske":
				case "Periferija & dodatki / Digitalna pisala / Digitizer Pisala & stylus":
					el.kategorija = "Miške";
					break;
				case "Periferija & dodatki / Ovitki, torbe in nahrbtniki / Ovitki za prenosnike":
				case "Periferija & dodatki / Ovitki, torbe in nahrbtniki / Torbe za prenosnike":
				case "Periferija & dodatki / Ovitki, torbe in nahrbtniki / Nahrbtniki":
				case "Prenosniki, PC & Tablični računalniki / Dodatki / Napajalniki za prenosne računalnike":
				case "Prenosniki, PC & Tablični računalniki / Dodatki / Dodatki za prenosnike":
				case "Prenosniki, PC & Tablični računalniki / Dodatki / Dodatki za tablične računalnike":
					el.kategorija = "dodatki za prenosnike";
					break;
				case "Periferija & dodatki / Prenapetostne zaščite / Prenapetostne zaščite":
				case "Gaming / Gaming dodatki / Gamepads & Joysticks":
				case "Gaming / Gaming dodatki / Podloge za igralne miške":
				case "Gaming / Gaming dodatki / Gaming slušalke & zvočniki":
				case "Telefonija & Pametne naprave / Wearables / Pametna očala & VR izdelki":
					el.kategorija = "Igralni pripomočki";
					break;
				case "Gaming / Gaming računalniki / Gaming prenosniki":
				case "Gaming / Gaming računalniki / Gaming PC":
				case "Prenosniki, PC & Tablični računalniki / Osebni računalniki (PC) / Poslovni PC":
				case "Prenosniki, PC & Tablični računalniki / Osebni računalniki (PC) / Consumer & gaming PC":
					el.kategorija = "Namizni računalniki";
					break;
				case "Konferenčni sistemi / Videokonerence / Video konference":
				case "Konferenčni sistemi / Zvočne konference / Zvočne konference":
				case "Konferenčni sistemi / Oprema za konferenčne sisteme / Dodatki za konferenčne sisteme":
				case "Konferenčni sistemi / Konferenčni računalnik / Konferenčni računalniki":
				case "Konferenčni sistemi / Konferenčni zasloni / Konferenčni zasloni":
				case "Konferenčni sistemi / Zvočne konference / IP telefoni":
					el.kategorija = "Konferenčna oprema";
					break;
				case "Telefonija & Pametne naprave / Stacionarni telefoni / Fiksni telefon, IP & PBX":
					el.kategorija = "Telefonija";
					break;
				case "Šport in gospodinjstvo / Mali gospodinjski aparati / Budilke":
				case "Avdio, video, monitorji & TV / Radio / Avto & Consumer Radio":
				case "Avdio, video, monitorji & TV / Radio / Mobilni radio":
				case "Avdio, video, monitorji & TV / Radio / Prenosni radio":
					el.kategorija = "Radio in budilke";
					break;
			}
		});
		// const arr = [];
		// this.allData.forEach((el) => {
		// 	if (!arr.includes(el.kategorija)) {
		// 		arr.push(el.kategorija);
		// 	}
		// });
		// console.log(arr);
	}

	formatZaloga(zaloga) {
		return zaloga !== "0 kos" ? "Na zalogi" : "Ni na zalogi";
	}

	splitDodatneLastnosti() {
		const ignore = [
			"EAN koda:",
			"EAN koda",
			"Proizvajalčeva koda",
			" ",
			"/",
		];
		let lastnosti = [];
		this.allData.forEach((data) => {
			data.dodatne_lastnosti.lastnost.forEach((el) => {
				if (
					ignore.includes(el["@_naziv"]) ||
					ignore.includes(el["#text"])
				) {
					return;
				}
				lastnosti.push({
					ean: data.ean,
					kategorija: data.kategorija,
					lastnostNaziv: el["@_naziv"],
					lastnostVrednost: el["#text"],
				});
			});
		});
		this.komponenta = lastnosti.map((el) => {
			return {
				KATEGORIJA_kategorija: el.kategorija,
				komponenta: el.lastnostNaziv.replace(":", ""),
			};
		});
		this.atribut = lastnosti.map((el) => {
			return {
				izdelek_ean: el.ean,
				KOMPONENTA_komponenta: el.lastnostNaziv.replace(":", ""),
				atribut: el.lastnostVrednost,
			};
		});
	}

	splitSlike() {
		let slike = [];
		this.allData.forEach((data) => {
			if (data.dodatne_slike.length) {
				data.dodatne_slike.forEach((el, idx) => {
					if (idx === 0) {
						slike.push({
							izdelek_ean: data.ean,
							slika_url: el["@_link"],
							tip: "mala",
						});
						slike.push({
							izdelek_ean: data.ean,
							slika_url: el["@_link"],
							tip: "velika",
						});
					}
					slike.push({
						izdelek_ean: data.ean,
						slika_url: el["@_link"],
						tip: "dodatna",
					});
				});
			}
		});
		this.slika = slike;
	}

	executeAll() {
		this.createDataObject();
		this.sortCategories();
		this.splitSlike();
		this.insertDataIntoDb();
	}
}
