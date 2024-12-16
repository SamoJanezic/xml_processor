export const dobavitelji = {
    // keys in order : izdelek_id,ean,izdelek_ime,kratki_opis,opis,cena_nabavna,dealer_cena,ppc,davčna_stopnja,slika_mala,slika_velika,dodatne_lastnosti,balgovna_znamka,kategorija,eprel_id

    acord: {
        name: "acord",
        nodes: "json.podjetje.izdelki.izdelek",
        // nodes1: "['podjetje']['izdelki']['izdelek']",
        file: "acord.xml",
        keys: ["izdelekID", "EAN", "izdelekIme", "niPodatka", "opis", "nabavnaCena", "DC", "PPC", "davcnaStopnja", "slikaMala", "slikaVelika", "dodatneLastnosti", "blagovnaZnamka", "kategorija", "niPodatka", "dobavitelj"]
    },
    avtera: {
        name: "avtera",
        nodes: "json.podjetje.izdelki.izdelek",
        file: "avtera.xml",
        keys: ["izdelekID", "EAN", "izdelekIme", "niPodatka", "opis", "nabavnaCena", "DC", "PPC", "davcnaStopnja", "dodatneSlike", "slikaVelika", "dodatneLastnosti", "blagovnaZnamka", "kategorija", "EprelID", "dobavitelj"]
    },
    colby: {
        name: "colby",
        nodes: "json.podjetje.izdelek",
        file: "colby.xml",
        keys: ["produktnakoda", "izdelekEAN", "izdelekIme", "kratkiopis", "tehnicniopis", "cena", "niPodatka", "PPCcena", "davcnaStopnja", "slikaMala", "dodatneSlike", "dodatneLastnosti", "blagovnaZnamka", "kategorija", "niPodatka", "dobavitelj"]
    },
    elkotex: {
        name: "elkotex",
        nodes: "json.items.item",
        file: "elkotex.xml",
        keys: ["ident", "ean", "naziv", "niPodatka", "opis", "price", "niPodatka", "mpc", "davek", "niPodatka", "slike", "niPodatka", "znamkaId", "podkategorijaNaziv", "niPodatka", "dobavitelj"]
    },
    eventus: {
        name: "eventus",
        nodes: "json.podjetje.izdelki.izdelek",
        file: "eventus.xml",
        keys: ["izdelekID", "EAN", "izdelekIme", "kratek_opis", "opis", "nabavnaCena", "DC", "PPC", "davcnaStopnja", "dodatneSlijke", "slikaVelika", "dodatneLastnosti", "blagovnaZnamka",  "kategorija", "niPodatka", "dobavitelj"]
    }
}



// class Dobavitelj {
//     constructor(node, file, keys) {
//         this.node = node,
//         this.file = file,
//         this.keys = keys
//     }
// }