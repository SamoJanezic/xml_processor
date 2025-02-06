const kategorije = {
	Računalništvo: [
		{ Prenosniki: ["Dodatki za prenosnike"] },
		"AIO",
		"Namizni Računalniki",
		"Mini Računalniki",
		"Tablični Računalniki",
		"Strežniki",
		"NAS",
		"Monitorji",
		{
			Komponente: [
				"Osnovne plošče",
				"Procesorji",
				"Pomnilniki",
				"Trdi diski",
				"Ohišja",
				"Napajalniki",
				"Grafične kartice",
				"Optične enote",
				"Zvočne kartice",
				"Hlajenje",
			],
		},
		"Mrežna oprema",
		"Tiskanje in optično branje",
		{
			"Zunanje naprave": [
				"Tipkovnice",
				"Miške",
				"UPS",
				"Kompleti",
				"Slušalke",
				"Zvočniki",
				"Spletne kamere",
				"USB Ključki",
				"Spominske kartice in čitalci",
				"Mediji",
				"Konferenčna oprema",
			],
		},
		"Gaming",
		"Programska oprema",
		"Kripto svet",
	],
	"Zvok in slika": [
		{ Televizije: ["Nosilci za TV"] },
		{ Fotoaparati: ["Objektivi"] },
		"Radio in budilke",
		"HI-FI in prenosni zvočniki",
		"Domači kino",
		{
			"Video Nadzor": [
				"Snemalniki",
				"Kamere",
				"domofoni",
				"Monitorji",
				"Nosilci",
				"Napajalniki",
			],
		},
		{
			Projekcija: [
				"Projektorji",
				"Projekcijska platna",
				"Nosilci za projektorje",
				"Žarnice za projektorje",
			],
		},
	],
	"Bela Tehnika": [
		{
			"Pranje in sušenje": [
				"Pralni stroji",
				"Sušilni stroji",
				"Pralno sušilni stroji",
			],
		},
		{ Pomivanje: ["Pomivalni stroji"] },
		{ "Hlajenje in zamrzovanje": ["Hladilniki", "Zamrzovalniki"] },
		{
			"Kuhanje in pečenje": [
				"Pečice",
				"Kuhališča",
				"Kuhalni seti",
				"Štedilniki",
				"Nape",
			],
		},
	],

	"Dom in vrt": [
		{
			"Mali gospodinjski aparati": [
				"Mikrovalovne Pečice",
				"Mesoreznice in salamoreznice",
				"Cvrtniki",
				"Kuhalniki",
				"Grelniki vode",
				"Kuhinjski roboti",
				"Kuhinjski žari",
				"Mešalniki",
				"Opekači kruha",
				"Sokovniki in ožemalniki",
				"Aparati za peko kruha",
				"Vakuumski aparati",
				"Multipraktiki",
				"Priprava kave in čaja",
				"Sušilci sadja",
				"Posoda",
				"Prenosna kuhališča",
				"Ledomati",
				"Tehtnice",
				"Likalniki",
				"Sesalniki",
			],
		},
		{
			"Hlajenje in gretje": [
				"Klimatske naprave",
				"Ventilatorji",
				"Radiatorji",
				"Razvlažilci zraka",
				"Vlažilci zraka",
				"Bojlerji",
				"Toplotne črpalke",
				"Hranilniki vode",
			],
		},
		"Žari",
		"Naprave za pametni dom",
		{ "Pametni vrtovi in semena": ["Pametni vrtovi", "Semena"] },
	],
	"Družina, šport in prosti čas": [
		{
			"Osebna nega": [
				"Brivniki",
				"Strižniki",
				"Nega las",
				"Depilatorji - epilatorji",
				"Ustna nega",
				"Pripomočki za osebno nego",
			],
		},
		"Daljnogledi",
		"Kolesa in skuterji",
		"Droni in dodatki",
		"Čelade",
		"Športne ure",
		"Kampiranje",
		"Hladilne torbe",
		"Termovke",
		"Čistilci na tlak in metle",
	],
};

function getKeysForValue(obj, value) {
	let keys = [];
	for (let key in obj) {
		if (typeof obj[key] === "object") {
			keys = keys.concat(
				getKeysForValue(obj[key], value).map(
					(subKey) => `${key} > ${subKey}`
				)
			);
		} else if (obj[key] === value) {
			keys.push(key);
		}
	}

	return keys;
}

export function formatKeys(item) {
	const str = getKeysForValue(kategorije, item);
	const arr = [];
	if (str[1]) {
		str.forEach((el) => {
			arr.push(el.replace(/ (> [0-9])+/g, "") + " > " + item);
		});
		return arr;
	}
	return str[0].replace(/ (> [0-9])+/g, "") + " > " + item;
}
