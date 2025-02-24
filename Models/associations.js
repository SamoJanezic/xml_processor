import { DataTypes } from "sequelize";
import { db } from "../db/db.js";
import { Izdelek } from "./Izdelek.js";
import { IzdelekDobavitelj } from "./IzdelekDobavitelj.js";
import { Kategorija } from "./Kategorija.js";
import { Dobavitelj } from "./Dobavitelj.js";

// Izdelek.bulkCreate([
//     { ean: 123456789, eprel: "1234", davcna_stopnja: 22, blagovna_znamka: "Logitech" },
//     { ean: 987654321, eprel: "9876", davcna_stopnja: 9.5, blagovna_znamka: "hp" }
// ]);

// IzdelekDobavitelj.bulkCreate([
//     { id: 1, dobavitelj: "asbis", kategorija: "miš", ime_izdelka: "m120", opis_izdelka: "m12", kratki_opis_izdelka: "m", nabavna_cena: 12.30, dealer_cena: 13.15, redna_cena: 14.60, ppc: 17.98 },
//     { id: 2, dobavitelj: "acord", kategorija: "pc", ime_izdelka: "hyperion", opis_izdelka: "hype", kratki_opis_izdelka: "h", nabavna_cena: 1.66, dealer_cena: 1.77, redna_cena: 1.88, ppc: 1.99 }
// ]);

Izdelek.hasMany(IzdelekDobavitelj, { foreignKey: 'izdelek_ean' });
IzdelekDobavitelj.belongsTo(Izdelek, {foreignKey: 'izdelek_ean' });

let izdelek, izdelekDobavitelj;

db.sync({ alter: true }).then(() => {
    return IzdelekDobavitelj.findOne({ where: { id: 2 } });
}).then((data) => {
    izdelekDobavitelj = data;
    return Izdelek.findOne({ where: { ean: 123456789 } });
}).then((data) => {
    izdelek = data;
    izdelekDobavitelj.setIzdelek(izdelek);
})
.catch(err => {
    console.log(err);
});

