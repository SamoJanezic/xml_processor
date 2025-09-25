import { modelsMap } from "./index.js";

modelsMap.IzdelekDobavitelj.belongsTo(modelsMap.Izdelek, {
  foreignKey: "izdelek_ean",
  targetKey: "ean"
});

modelsMap.IzdelekDobavitelj.belongsTo(modelsMap.Dobavitelj, {
  foreignKey: "DOBAVITELJ_dobavitelj",
  targetKey: "dobavitelj"
});

modelsMap.IzdelekDobavitelj.belongsTo(modelsMap.Kategorija, {
  foreignKey: "KATEGORIJA_kategorija",
  targetKey: "kategorija"
});

modelsMap.Kategorija.hasMany(modelsMap.IzdelekDobavitelj, {
	foreignKey: "KATEGORIJA_kategorija",
	sourceKey: "kategorija",
});


modelsMap.Izdelek.hasMany(modelsMap.IzdelekDobavitelj, {
	foreignKey: "izdelek_ean",
	sourceKey: "ean",
});


modelsMap.Izdelek.hasMany(modelsMap.IzdelekDobavitelj, {
	foreignKey: "izdelek_ean",
	sourceKey: "ean",
});

modelsMap.Slika.belongsTo(modelsMap.Izdelek, {
  foreignKey: "izdelek_ean",
  targetKey: "ean"
});

modelsMap.Izdelek.hasMany(modelsMap.Slika, {
  foreignKey: "izdelek_ean",
  sourceKey: "ean"
});


modelsMap.Komponenta.belongsTo(modelsMap.Kategorija, {
  foreignKey: "KATEGORIJA_kategorija",
  targetKey: "kategorija"
});

modelsMap.Kategorija.hasMany(modelsMap.Komponenta, {
  foreignKey: "KATEGORIJA_kategorija",
  sourceKey: "kategorija"
});

modelsMap.Atribut.belongsTo(modelsMap.Komponenta, {
  foreignKey: "KOMPONENTA_komponenta",
  targetKey: "komponenta"
});

modelsMap.Komponenta.hasMany(modelsMap.Atribut, {
  foreignKey: "KOMPONENTA_komponenta",
  sourceKey: "komponenta"
});