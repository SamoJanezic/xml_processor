import cn from "./categoryNames.js";

const alsoCategoryMap = {
	[cn.POTROSNI_M]: [
		"Tiskanje, optično branje & potrošni mat. / Potrošni material - Papir / Papirji velikega formata",
		"Tiskanje, optično branje & potrošni mat. / Potrošni material - Papir / Office & Foto papirji",
		"Tiskanje, optično branje & potrošni mat. / Potrošni material - Črnila / Ink črnila & glave",
		"Tiskanje, optično branje & potrošni mat. / Potrošni material - Laser / Tonerji",
		"Tiskanje, optično branje & potrošni mat. / Potrošni material - matrični tiskalnik / Trakovi",
		"Tiskanje, optično branje & potrošni mat. / Potrošni material - Laser / Laserski bobni",
		"Tiskanje, optično branje & potrošni mat. / Potrošni material - Tiskalnik nalepk / Trakovi & etikete",
		"Tiskanje, optično branje & potrošni mat. / Potrošni material - Laser / Transfer Belt Units & Kits",
		"Tiskanje, optično branje & potrošni mat. / Potrošni material - tiskalniki velikega / LFP Inks & LFP glave",
		"Tiskanje, optično branje & potrošni mat. / Potrošni material - Laser / Odpadne toner škatle",
		"Tiskanje, optično branje & potrošni mat. / Potrošni material - tiskalniki velikega / LFP Vzdrževanje & čistilni kompleti",
		"Tiskanje, optično branje & potrošni mat. / Potrošni material - Laser / Laserski kompleti za vzdrževanje",
		"Tiskanje, optično branje & potrošni mat. / Tiskalniki, optični bralnik, dodatna opr / Pribor za tiskalnike - drugo",
		"Tiskanje, optično branje & potrošni mat. / Potrošni material - Papir / Nalepke, računi & matrika",
		"Tiskanje, optično branje & potrošni mat. / Potrošni material - Laser / Kompleti za varovalke tiskalnika",
		"Tiskanje, optično branje & potrošni mat. / Potrošni material - Laser / Laserski fotoprevodniki",
		"Tiskanje, optično branje & potrošni mat. / Potrošni material - Laser / Sponke",
		"Tiskanje, optično branje & potrošni mat. / Potrošni material - Črnila / Stekleničke & ostali dodatki",
		"Tiskanje, optično branje & potrošni mat. / Tiskalniki, optični bralnik, dodatna opr / Sponke",
		"Tiskanje, optično branje & potrošni mat. / Tiskalniki, optični bralnik, dodatna opr / Pladnji"
	],
	[cn.PRINTER]: [
		"Tiskanje, optično branje & potrošni mat. / Tiskalniki velikega formata (LFP) / Ploterji & skenerji",
		"Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Laserski enobarvni tiskalniki",
		"Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Laserski barvni tiskalniki",
		"Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Matrični tiskalniki",
		"Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Tiskalniki nalepk",
		"Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Večnamenski laserski barvni tiskalniki",
		"Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Ink tiskalniki",
		"Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Večnamenski laserski tiskalniki",
		"Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Večnamenski laserski barvni tiskalniki",
		"Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Tiskalniki - mobilni",
		"Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Foto tiskalniki",
		"Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / Večnamenski ink tiskalniki"
	],
	[cn.SCANNER]: [
		"Tiskanje, optično branje & potrošni mat. / Optični bralniki / Optični bralniki dokumentov",
		"Tiskanje, optično branje & potrošni mat. / Tiskalniki, optični bralnik, dodatna opr / Dodatki za skenerje - drugo",
		"Tiskanje, optično branje & potrošni mat. / Optični bralniki / Skenerji - mobilni",
		"Tiskanje, optično branje & potrošni mat. / Optični bralniki / Optični bralniki fotografij"
	],
	[cn.POS]: [
		"Tiskanje, optično branje & potrošni mat. / Tiskalniki & multifunkcijske naprave / POS tiskalniki",
		"Pisarniška oprema / Pisarniška oprema / Mala pisarniška oprema",
		"Pisarniška oprema / Pisarniška oprema / Baterije & polnilci",
		"Prenosniki, PC & Tablični računalniki / Dodatki / Dodatki za POS"
	],
	[cn.SERVER]: [
		"Strežniki, diskovna polja & UPS / Dodatki / Dodatki za Rack omare",
		"Strežniki, diskovna polja & UPS / Rack omare / Rack omare",
		"Strežniki, diskovna polja & UPS / Diskovna polja / Tape",
		"Strežniki, diskovna polja & UPS / Razdelilci (PDU) / Osnovni PDU",
		"Strežniki, diskovna polja & UPS / Razdelilci (PDU) / Switched PDU",
		"Strežniki, diskovna polja & UPS / Razdelilci (PDU) / Metered PDU",
		"Strežniki, diskovna polja & UPS / Dodatki / Strežnik, pomnilnik - Ostala dodatna opr",
		"Strežniki, diskovna polja & UPS / Strežniki / Rack strežniki",
		"Strežniki, diskovna polja & UPS / Diskovna polja / Strežnik HDD",
		"Strežniki, diskovna polja & UPS / Diskovna polja / Strežnik SSD",
		"Strežniki, diskovna polja & UPS / Diskovna polja / JBOD & SANs",
		"Strežniki, diskovna polja & UPS / Strežniki / Tower strežniki",
		"Periferija & dodatki / KVM / Dodatki KVM",
		"Komponente / Krmilniki / Raid krmlniki"
	],
	[cn.UPS]: [
		"Strežniki, diskovna polja & UPS / Brezprekinitveno napajanje (UPS) / Line Interactive Rack mounts",
		"Strežniki, diskovna polja & UPS / Brezprekinitveno napajanje (UPS) / Line Interactive Tower",
		"Strežniki, diskovna polja & UPS / Dodatki / UPS dodatki & baterije",
		"Strežniki, diskovna polja & UPS / Brezprekinitveno napajanje (UPS) / Off Line UPS",
		"Strežniki, diskovna polja & UPS / Brezprekinitveno napajanje (UPS) / Online Rack mounts",
		"Strežniki, diskovna polja & UPS / Brezprekinitveno napajanje (UPS) / Online Towers"
	],
	[cn.SOFTWARE]: [
		"Programska oprema & oblak / Pisarniška programska oprema / Zbirke officeovih aplikacij",
		"Programska oprema & oblak / Strežniška programska oprema & licence / Strežniško programsko opremo",
		"Programska oprema & oblak / Operacijski sistemi / Programska oprema Microsoft Windows",
		"Programska oprema & oblak / Business & Productivity Software / Programska oprema Databases & Tools",
		"Programska oprema & oblak / Razvojna orodja / Programska oprema za razvijalce",
		"Programska oprema & oblak / Business & Productivity Software / Data Analysis & Content Mgmt Software",
		"Programska oprema & oblak / Strežniška programska oprema & licence / Strežnik CAL",
		"Programska oprema & oblak / Omrežna programska oprema / Programska oprema za spletne konference",
		"Programska oprema & oblak / Naročnine zaa programsko opremo / Programska oprema za naročnine na OS",
		"Programska oprema & oblak / Mac programska oprema / Antivirus & varnost",
		"Programska oprema & oblak / Protivirusna programska oprema / Protivirusna programska oprema",
		"Programska oprema & oblak / Protivirusna programska oprema / Programska oprema varnostnih apartmajev",
		"Avdio, video, monitorji & TV / Public Display & Signage / Programska oprema za signage"
	],
	[cn.ROM_DRIVE]: [
		"Komponente / Optični pogoni / Blu-Ray, CD/DVD pogoni"
	],
	[cn.MIS]: [
		"Periferija & dodatki / Miške / Miške - Žične",
		"Periferija & dodatki / Miške / Miške - Brezžične",
		"Periferija & dodatki / Miške / Prezenterji",
		"Periferija & dodatki / Miške / Miške",
		"Periferija & dodatki / Miške / Miške - Ergonomske",
		"Periferija & dodatki / Digitalna pisala / Digitizer Pisala & stylus"
	],
	[cn.WEB_CAM]: [
		"Avdio, video, monitorji & TV / Dodatki / Kamere - Dodatna oprema",
		"Avdio, video, monitorji & TV / Kamere & optični sistemi / Spletne kamere",
	],
	[cn.SLUSALKE]: [
		"Avdio, video, monitorji & TV / Slušalke & mikrofoni / Consumer & Gaming slušalke",
		"Avdio, video, monitorji & TV / Slušalke & mikrofoni / Poslovne slušalke",
		"Avdio, video, monitorji & TV / Slušalke & mikrofoni / Mikrofoni & diktafoni",
		"Avdio, video, monitorji & TV / Dodatki / Slušalke & mikrofoni - dodatki",
		"Telefonija & Pametne naprave / Dodatki za pametne telefone / Pametni telefoni - Slušalke"
	],
	[cn.MONITOR]: [
		"Avdio, video, monitorji & TV / Monitorji / Poslovni monitorji",
		"Avdio, video, monitorji & TV / Monitorji / Consumer monitorji",
		"Gaming / Gaming monitorji / Gaming monitorji"
	],
	[cn.PROJ_NOSILEC]: [
		"Avdio, video, monitorji & TV / Oprema za projektorje / Montaža projektorja"
	],
	[cn.PROJ_PLATNO]: [
		"Avdio, video, monitorji & TV / Oprema za projektorje / Projektorji - Dodatki",
		"Avdio, video, monitorji & TV / Oprema za projektorje / Dodatki za projektorje - drugo"
	],
	[cn.PROJ]: [
		"Avdio, video, monitorji & TV / Projektorji / Ostali projektorji",
		"Avdio, video, monitorji & TV / Projektorji / Poslovni projektorji",
		"Avdio, video, monitorji & TV / Projektorji / Consumer projektorji",
		"Avdio, video, monitorji & TV / Oprema za projektorje / Objektivi",
		"Izobraževanje / Predstavitev EDU / Projektor EDU"
	],
	[cn.TV]: [
		"Avdio, video, monitorji & TV / Public Display & Signage / Hotelski TV",
		"Avdio, video, monitorji & TV / Televizorji / TV",
		"Avdio, video, monitorji & TV / Public Display & Signage / Digitalni zasloni na dotik",
		"Avdio, video, monitorji & TV / Public Display & Signage / Zunanji digitalni zasloni",
		"Avdio, video, monitorji & TV / Public Display & Signage / Digitalni zasloni"
	],
	[cn.SOUND_BAR]: [
		"Avdio, video, monitorji & TV / Zvočniki / PC zvočniki & Sound Bar"
	],
	[cn.HIFI]: [
		"Avdio, video, monitorji & TV / Zvočniki / Prenosni & brezžični zvočniki",
		"Avdio, video, monitorji & TV / Avdio & video sistemi / Digitalni AV sistemi"
	],
	[cn.TV_MOUNT]: [
		"Avdio, video, monitorji & TV / Dodatki / Nosilci - Stojalo za mizo",
		"Avdio, video, monitorji & TV / Dodatki / Nosilci - Video stena",
		"Avdio, video, monitorji & TV / Dodatki / Nosilci - Stena",
		"Avdio, video, monitorji & TV / Dodatki / Nosilci - drugo"
	],
	[cn.FOTOAPARAT]: [
		"Avdio, video, monitorji & TV / Kamere & optični sistemi / Digitalni fotoaparati"
	],
	[cn.LAN_CARD_EXTENDERS]: [
		"Omrežje & Smart Home / Omrežna dodatna oprema / Mrežne kartice & adapterji"
	],
	[cn.ROUTER_SWITCH_AP]: [
		"Omrežje & Smart Home / Mrežna oprema / Usmerjevalniki",
		"Omrežje & Smart Home / Mrežna oprema / Stikala - CLI managed",
		"Omrežje & Smart Home / Mrežna oprema / Stikala - PoE",
		"Omrežje & Smart Home / Mrežna oprema / Stikala – neupravljano",
		"Omrežje & Smart Home / Mrežna oprema / Stikala – upravljano s spletom",
		"Omrežje & Smart Home / Mrežna oprema / Dostopne točke & kontrolerji",
		"Omrežje & Smart Home / Mrežna oprema / Požarni zidovi",
		"Periferija & dodatki / KVM / Stikala KVM"
	],
	[cn.P_DOM]: [
		"Omrežje & Smart Home / Omrežna dodatna oprema / Omrežni napajalniki",
		"Omrežje & Smart Home / Omrežna dodatna oprema / Omrežje - Drugi dodatki",
		"Omrežje & Smart Home / Smart Home / Pametna zaščita"
	],
	[cn.M_BOARD]: [
		"Komponente / Matične plošče / Matične plošče - INTEL",
		"Komponente / Matične plošče / Matične plošče - AMD"
	],
	[cn.HDD]: [
		"Komponente / Shranjevanje podatkov / Notranji diski (HDD)",
		"Komponente / Shranjevanje podatkov / Zunanji diski (HDD)",
		"Komponente / Shranjevanje podatkov / Notranji diski (SSD)",
		"Komponente / Shranjevanje podatkov / Zunanji diski (SSD)"
	],
	[cn.COOLER]: [
		"Komponente / Dodatki za komponente / Dodatki za komponente - drugo",
		"Komponente / Ventilatorji & hladilni sistemi / Računalniški ventilatorji",
		"Komponente / Ventilatorji & hladilni sistemi / Ventilatorji & hladilni sistemi",
		"Komponente / Ventilatorji & hladilni sistemi / Fanless ventilatorji & hladilniki"
	],
	[cn.PSU]: [
		"Komponente / Napajalniki (PSU) / Napajalniki za strežnike",
		"Komponente / Napajalniki (PSU) / Napajalniki za računalnike"
	],
	[cn.RAM]: [
		"Komponente / Pomnilnik / Delovni pomnilnik za prenosnike",
		"Komponente / Pomnilnik / Delovni pomnilnik za strežnike",
		"Komponente / Pomnilnik / Delovni pomnilnik za PC"
	],
	[cn.CPU]: [
		"Komponente / Procesorji (CPU) / Procesorji za strežnike"
	],
	[cn.GPU]: [
		"Komponente / Grafične kartice (GPU) / Grafične kartice - Delovne postaje"
	],
	[cn.SD_CARD]: [
		"Komponente / Pomnilnik / Flash pomnilnik"
	],
	[cn.USB_KEY]: [
		"Komponente / Pomnilnik / USB pomnilnik"
	],
	[cn.LAPTOP]: [
		"Gaming / Gaming računalniki / Gaming prenosniki",
		"Prenosniki, PC & Tablični računalniki / Osebni računalniki (PC) / Delovne postaje",
		"Prenosniki, PC & Tablični računalniki / Osebni računalniki (PC) / Terminali & Tanki odjemalci",
		"Prenosniki, PC & Tablični računalniki / Prenosniki / Poslovni prenosniki",
		"Prenosniki, PC & Tablični računalniki / Prenosniki / Consumer prenosniki",
		"Prenosniki, PC & Tablični računalniki / Prenosniki / Mobilne delovne postaje"
	],
	[cn.TABLET]: [
		"Prenosniki, PC & Tablični računalniki / Tablični računalniki / Tablični računalniki - Windows",
		"Prenosniki, PC & Tablični računalniki / Tablični računalniki / Tablični računalniki - Android"
	],
	[cn.AIO]: [
		"Prenosniki, PC & Tablični računalniki / Osebni računalniki (PC) / All in one PC"
	],
	[cn.TIPKOVNICA]: [
		"Periferija & dodatki / Tipkovnice / Tipkovnice - Brezžične",
		"Periferija & dodatki / Tipkovnice / Tipkovnice - Žične",
		"Periferija & dodatki / Tipkovnice / Numerične tipkovnice"
	],
	[cn.KOMPLET]: [
		"Periferija & dodatki / Kompleti / Miška & tipkovnica - Brezžično",
		"Periferija & dodatki / Kompleti / Miška & tipkovnica - Žične",
		"Gaming / Gaming dodatki / Gaming miške & tipkovnice"
	],
	[cn.LAPTOP_DODATKI]: [
		"Periferija & dodatki / Ovitki, torbe in nahrbtniki / Ovitki za prenosnike",
		"Periferija & dodatki / Ovitki, torbe in nahrbtniki / Torbe za prenosnike",
		"Periferija & dodatki / Ovitki, torbe in nahrbtniki / Nahrbtniki",
		"Prenosniki, PC & Tablični računalniki / Dodatki / Napajalniki za prenosne računalnike",
		"Prenosniki, PC & Tablični računalniki / Dodatki / Dodatki za prenosnike",
		"Prenosniki, PC & Tablični računalniki / Dodatki / Dodatki za tablične računalnike",
		"Prenosniki, PC & Tablični računalniki / Dodatki / Priklopne postaje za prenosnike"
	],
	[cn.GAMEPAD]: [
		"Periferija & dodatki / Prenapetostne zaščite / Prenapetostne zaščite",
		"Gaming / Gaming dodatki / Gamepads & Joysticks",
		"Gaming / Gaming dodatki / Podloge za igralne miške",
		"Gaming / Gaming dodatki / Gaming slušalke & zvočniki",
		"Telefonija & Pametne naprave / Wearables / Pametna očala & VR izdelki"
	],
	[cn.PC]: [
		"Gaming / Gaming računalniki / Gaming PC",
		"Prenosniki, PC & Tablični računalniki / Osebni računalniki (PC) / Poslovni PC",
		"Prenosniki, PC & Tablični računalniki / Osebni računalniki (PC) / Consumer & gaming PC"
	],
	[cn.KONF_OPREMA]: [
		"Konferenčni sistemi / Videokonerence / Video konference",
		"Konferenčni sistemi / Zvočne konference / Zvočne konference",
		"Konferenčni sistemi / Oprema za konferenčne sisteme / Dodatki za konferenčne sisteme",
		"Konferenčni sistemi / Konferenčni računalnik / Konferenčni računalniki",
		"Konferenčni sistemi / Konferenčni zasloni / Konferenčni zasloni",
		"Konferenčni sistemi / Zvočne konference / IP telefoni"
	],
	[cn.RADIO]: [
		"Šport in gospodinjstvo / Mali gospodinjski aparati / Budilke",
		"Avdio, video, monitorji & TV / Radio / Avto & Consumer Radio",
		"Avdio, video, monitorji & TV / Radio / Mobilni radio",
		"Avdio, video, monitorji & TV / Radio / Prenosni radio"
	]
};


export default alsoCategoryMap;