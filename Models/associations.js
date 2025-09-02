import { IzdelekDobavitelj } from "./IzdelekDobavitelj.js";
import { Izdelek } from "./Izdelek.js";
import { Dobavitelj } from "./Dobavitelj.js";
import { Kategorija } from "./Kategorija.js";
import { Slika } from "./Slika.js";
import { Komponenta } from "./Komponenta.js";
import { Atribut } from "./Atribut.js";


IzdelekDobavitelj.belongsTo(Izdelek, {
  foreignKey: "izdelek_ean",
  targetKey: "ean"
});

IzdelekDobavitelj.belongsTo(Dobavitelj, {
  foreignKey: "DOBAVITELJ_dobavitelj",
  targetKey: "dobavitelj"
});

IzdelekDobavitelj.belongsTo(Kategorija, {
  foreignKey: "KATEGORIJA_kategorija",
  targetKey: "kategorija"
});

Kategorija.hasMany(IzdelekDobavitelj, {
	foreignKey: "KATEGORIJA_kategorija",
	sourceKey: "kategorija",
});


Izdelek.hasMany(IzdelekDobavitelj, {
	foreignKey: "izdelek_ean",
	sourceKey: "ean",
});


Izdelek.hasMany(IzdelekDobavitelj, {
	foreignKey: "izdelek_ean",
	sourceKey: "ean",
});

Slika.belongsTo(Izdelek, {
  foreignKey: "izdelek_ean",
  targetKey: "ean"
});

Izdelek.hasMany(Slika, {
  foreignKey: "izdelek_ean",
  sourceKey: "ean"
});


Komponenta.belongsTo(Kategorija, {
  foreignKey: "KATEGORIJA_kategorija",
  targetKey: "kategorija"
});

Kategorija.hasMany(Komponenta, {
  foreignKey: "KATEGORIJA_kategorija",
  sourceKey: "kategorija"
});

Atribut.belongsTo(Komponenta, {
  foreignKey: "KOMPONENTA_komponenta",
  targetKey: "komponenta"
});

Komponenta.hasMany(Atribut, {
  foreignKey: "KOMPONENTA_komponenta",
  sourceKey: "komponenta"
});