import dobaviteljController from "./dobaviteljController.js";

export class elkotexController extends dobaviteljController {
	name = "elkotex";
	nodes = "json.items.item";
	file = "elkotex.xml";
	keys = [
		"ident",
		"ean",
		"naziv",
		"niPodatka",
		"opis",
		"price",
		"niPodatka",
		"mpc",
		"davek",
		"niPodatka",
		"niPodatka",
		"slike",
		"niPodatka",
		"znamkaId",
		"podkategorijaNaziv",
		"niPodatka",
		"dobavitelj",
		"zaloga",
	];

	exceptions(param) {
		const ignoreCategory = [
			"Uncategorized",
			"Oprema za kopalnice",
			"Medicinski pripomočki",
			"Obnovljeni računalniki",
			"Bazeni, dodatki za bazene",
			"LED sijalke, žarnice",
			"LED luči",
			"Električno orodje",
			"Pisarniški stoli",
			"Balkonske sončne elektrarne",
			"Pisarniško pohištvo",
			"Robustni telefoni",
			"Ostali izdelki",
			"Odstranjevalci vlaken",
			"Ohišja za diske",
			"Vrtno pohištvo in dodatki",
			"LED trakovi",
			"Telefonija",
			"Sokovniki",
			"Čistilniki zraka",
			"Baterije in polnilci",
			"Polnilne postaje, agregati",
			'Pohištvo',
			'Solarni paneli',
			'Namizne svetilke',
			'Dodatki',
			'Sit-stand mize, podstavki in nosilci',
			'Koši za odpadke',
			"Ostalo",
			"Rezervni deli"
		];
		if (ignoreCategory.includes(param["podkategorijaNaziv"])) {
			return true;
		}
	};

	sortCategory() {
		this.allData.forEach((el) => {
			switch (el.kategorija) {
				case 'Razširitvene kartice':
					el.kategorija = "Komponenta";
					break;
				case "Likaniki":
					el.kategorija = "Likalniki";
				case 'Nega zob':
					el.kategorija = "Ustna nega";
					break;
				case 'Nega telesa':
					el.kategorija = "Pripomočki za osebno nego";
					break;
				case 'Pisarniška tehnika':
				case 'Uničevalci dokumentov':
				case 'Organizatorji in dodatki':
				case 'Organizatorji in dodatki':
					el.kategorija = "POS in dodatki";
					break;
				case 'Laserski tiskalniki':
					el.kategorija = "Tiskalniki";
					break;
				case "Bluetooth":
					el.kategorija = "Mediji";
					break;
				case 'Ojačevalniki brezžičnega omrežja':
				case 'PoE':
				case 'Mrežne kartice':
					el.kategorija = "Mrežne kartice, antene, WIFI ojačevalci";
					break;
				case 'Difuzorji':
					el.kategorija = "Vlažilci zraka";
					break;
				case 'Torbe in nahrbtniki za fotoaparate in drone':
					el.kategorija = "Fotoaparati";
					break;
				case 'Pametne ure':
					el.kategorija = 'Športne ure';
					break;
				case 'Klasični in ročni sesalniki':
				case 'Pokončni sesalniki':
				case 'Parni čistilniki':
					el.kategorija = "Sesalniki";
					break;
				case 'Prenosni zvočniki':
					el.kategorija = "HI-FI in Prenosni zvočniki";
					break;
				case 'Domofoni':
				case 'Vremenske postaje':
					el.kategorija = "Naprave za pametni dom";
					break;
				case "Krmilniki in stikala":
				case 'Stikala':
				case 'Usmerjevalniki':
					el.kategorija = "Usmerjevalniki, stikala in AP";
					break;
				case "Ventilatorji in dodatki":
					el.kategorija = "Ventilatorji";
					break;
				case "Mini-micro-barebone (NUC)":
					el.kategorija = "Mini";
					break;
				case 'Napajalniki za prenosnike':
				case "Torbe za prenosnike":
				case "Nahrbtniki za prenosnike":
				case 'Hlajenje za prenosnike':
					el.kategorija = "Dodatki za prenosnike";
					break;
				case "Oljni radiatorji":
				case "Konvekcijski radiatorji":
					el.kategorija = "Radiatorji";
				case "Slušalke in mikrofoni":
				case 'Naglavne slušalke':
				case 'True Wireless slušalke':
				case 'In-Ear slušalke':
					el.kategorija = "Slušalke";
					break;
				case "USB hubi in priklopne postaje":
				case 'Centralne nadzorne enote (HUB)':
					el.kategorija = "Zunanje naprave";
					break;
				case "Video adapterji":
				case 'Zvočni adapterji':
				case "Priključni kabli in adapterji":
				case "Kabli":
				case 'Podaljški, razdelilci':
				case 'Video kabli':
				case 'Mrežni kabli':
				case 'Mrežni adapterji':
				case 'Video kabli':
				case 'Urejanje kablov':
				case 'Avto polnilci':
				case 'Zvočni kabli':
					el.kategorija = "Kabli in adapterji";
					break;
				case "Kuhinjsko orodje":
				case "Kuhinjski organizatorji":
				case 'Kuhinjski pripomočki':
				case 'Priprava hrane':
					el.kategorija = "Mali gospodinjski aparati";
					break;
				case "Zvočni sistemi za domači kino":
				case 'Medijski predvajalniki':
					el.kategorija = "Domači kino";
					break;
				case "Tablični računalniki in e-Bralniki":
				case "Etuiji za tablice in diske":
					el.kategorija = "Tablični računalniki";
					break;
				case "Torbe in nahrbtniki za prosti čas":
					el.kategorija = "Šport in prosti čas";
					break;
				case "Vlažilniki zraka":
					el.kategorija = "Vlažilci zraka";
					break;
				case "MP3/MP4 predvajalniki":
				case "Pametne zapestnice":
				case "Pametni telefoni":
				case 'Nosilci za telefone':
				case 'Prenosne baterije / Powerbank':
					el.kategorija = "Pametne naprave";
					break;
				case "Dodatki za skiroje":
				case "Električni skiroji":
				case "Vse za kolo":
					el.kategorija = "Kolesa in skuterji";
					break;
				case "IR grelniki":
				case "Hladilci zraka":
				case "Kaloriferji, stenski grelniki":
				case 'Kamini':
				case 'Solarni paneli':
					el.kategorija = "Hlajenje in gretje";
					break;
				case "Microsoft Windows":
				case "Microsoft Office":
					el.kategorija = "Programska oprema";
					break;
				case "Home Plug PowerLine":
					el.kategorija = "Powerline";
					break;
				case "NAS naprave":
				case "NAS dodatki":
					el.kategorija = "NAS sistemi";
					break;
				case "Hladilniki za procesorje":
				case "Termalne paste":
					el.kategorija = "Hlajenje";
					break;
				case "Mlinčki za kavo":
				case "Kavni aparati":
					el.kategorija = "Priprava kave in čaja";
					break;
				case "Zunanji diski":
				case "Zunanji SSD diski":
					el.kategorija = "Trdi diski";
					break;
				case "Tonerji in črnila":
				case 'Papir':
					el.kategorija = "Potrošni material";
					break;
				case "Spominske kartice":
				case "Čitalniki kartic in zaščitne škatlice":
					el.kategorija = "Spominske kartice in čitalci";
					break;
				case "SSD diski":
					el.kategorija = "Trdi diski";
					break;
				case "Pomnilniški moduli":
					el.kategorija = "Pomnilniki";
					break;
				case "Opekači kruha, toasterji":
					el.kategorija = "Opekači kruha";
					break;
				case "Priprava sladoleda in ledomati":
					el.kategorija = "Ledomat";
					break;
				case "Kuhinjske tehtnice":
					el.kategorija = "Tehtnice";
					break;
				case "Salamoreznice/mletje mesa":
					el.kategorija = "Mesoreznice in salamoreznice";
					break;
				case "Blenderji, mešalniki":
					el.kategorija = "Mešalniki";
					break;
				case "Posode za živila":
				case "Kuhinjska posoda":
				case "Posodice za vodo":
					el.kategorija = "Posoda";
					break;
				case "Penilniki mleka":
					el.kategorija = "Mešalniki";
					break;
				case "Električne pečice, žari in grelne ploskve":
					el.kategorija = "Kuhinjski žari";
					break;
				case "Stojala za perilo in obešalniki":
				case "Vrtno orodje":
				case "Ročno orodje":
				case "Hišni polnilci":
				case 'Čiščenje okolice':
				case 'Oprema za delavnice, skladišča':
				case 'Senčniki in paviljoni':
				case "Oprema vrta in okolice":
					el.kategorija = "Dom in vrt";
					break;
				case "Radio/Gramofoni":
					el.kategorija = "Radio in budilke";
					break;
				case "Kamp žari":
				case 'Žari in kurišča':
					el.kategorija = "Žari";
					break;
				case 'Prenosne svetilke':
				case 'Termovke':
				case "Kamp dodatki in ostalo":
				case "Kamp hladilne skrinje in torbe":
				case "Kamp svetilke in komarniki":
				case "Kamp paviljoni, šotori, senčniki":
				case "Kamp pohištvo":
				case "Kamp ležalniki in stoli":
				case "Kamp kuhinjski pripomočki":
					el.kategorija = "Kampiranje";
					break;
				case "Pametne sijalke":
				case "Robotski sesalniki":
				case "Robotske kosilnice":
				case "Pametni dom":
				case 'Pametne vtičnice':
				case 'Senzorji':
					el.kategorija = "Naprave za pametni dom";
					break;
			}
		});
	};

	formatZaloga(zaloga) {
		return zaloga > 0 ? "Na zalogi" : "Ni na zalogi";
	}

	parseObject(obj) {
		if (obj.slika) {
			return Object.values(obj);
		}
	};

	getEprel() {
		return null;
		// function extractNumber(str) {
		// 	const regex = /Fiche_(\d+)_SL\.pdf/;
		// 	const match = str.match(regex);
		// 	return match ? match[1] : null;
		// }
		
		// const inputString = `<p><strong>diagonala zaslona</strong>: 86,36 cm/34"<br /> <strong>tip zaslona</strong>: VA<br /> <strong>format zaslona</strong>: 21:9<br /> <strong>največja ločljivost</strong>: 3440x1440 @ 100Hz<br /> <strong>odzivni čas</strong>: 4ms<br /> <strong>kontrast</strong>: 3000:1<br /> <strong>svetilnost</strong>: 500cd/<span style="line-height: 17.12px; font-size: 16px; color: #333333;">m&sup2;</span><br /> <strong>vidni kot&nbsp;</strong>(horizontalno/vertikalno): 178&deg;/178&deg;<br /> <strong>priključki</strong>: 1x HDMI 2.0, 1x DisplayPort 1.4, 1x USB-C 3.2 z PD 90W; signalni izhod DisplayPort ( DP, USB-C)<br /> <strong>zvočniki</strong>: 2x 5W<br /> <strong>poraba</strong>: On: 34,1 W, Standby: 0,5 W<br /> <strong>barva</strong>: črna<br /> <strong>dodatno</strong>: vgrajena priključna postaja USB-C za prenosnik, premaz proti ble&scaron;čanju, izhod za slu&scaron;alke, <span>Ethernet LAN do 1 Gbs, prebujanje prek omrežja LAN, spletna k<span>amera FullHD z 2,0 milijona slikovnih pik, mikrofonom in LED-indikatorjem (za Windows 10 Hello). n<span>ačin prikaza slike PIP/PBP, 180mm nastavljiv po vi&scaron;ini, -180&deg;/+180&deg;vrtljiv, HDR 400<br /></span></span></span></p>
		// <p><span><span><span>Povezava do informacijskega lista: <a href="https://eprel.ec.europa.eu/fiches/electronicdisplays/Fiche_416787_SL.pdf">https://eprel.ec.europa.eu/fiches/electronicdisplays/Fiche_416787_SL.pdf</a><br />Povezava do energetske nalepke: <a href="https://eprel.ec.europa.eu/labels/electronicdisplays/Label_416787.svg">https://eprel.ec.europa.eu/labels/electronicdisplays/Label_416787.svg</a><br /><br /></span></span></span></p>]]`;
		
		// const extractedNumber = extractNumber(inputString);
		// console.log(extractedNumber)
	}

	splitSlike() {
		let slike = [];
		this.allData.forEach((data) => {
			if(typeof(data.dodatne_slike[0]) === 'object') {
				data.dodatne_slike[0].forEach(el => {
					slike.push({
						izdelek_ean: data.ean,
						slika_url: el,
						tip: "dodatna",
					});
				})
			} else {
				slike.push({
					izdelek_ean: data.ean,
					slika_url: data.dodatne_slike[0],
					tip: "dodatna",
				});
			}
		});
		this.slika = slike;
	}


	executeAll() {
		this.createDataObject();
		this.sortCategory();
		this.addKratki_opis();
		this.splitSlike();
		this.insertDataIntoDb();
	};
};
