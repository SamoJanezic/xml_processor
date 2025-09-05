import cn from "./categoryNames.js";

const colbyCategoryMap = {
        [cn.KOLO]: ["Električna mobilnost"],
        [cn.POTROSNI_M]: ["Pisarniški material"],
        [cn.M_PODLOGE]: ["Podloge za miške"],
        [cn.DOM_VRT]: ["Vse za dom", "Dom in vrt"],
        [cn.URE]: ["Ure"],
        [cn.P_DOM]: ["Pametni dom", "Naprave za pametni dom"],
        [cn.OHISJE]: ["Ohišje"],
        [cn.IGRE]: [
            undefined, "PC", "Outright Games", "PS4", "PS5", "SWITCH", "PM Studios", "XBOXONE", "XONE", "Playstation 4",
            "Xbox One", "Xbox One Series X", "Xbox Series X", "Playstation 5", "Nintendo Switch", "Letalski simulator",
            "XBOXSERIESX", "XBOX", "XBSX", "Xbox One & Xbox Series X", "Xbox Series X & Xbox One", "Nintendo Switch 2", "Nintendo Switch 2 Edition"
        ],
        [cn.GAMEPAD]: [
            "VR očala in dodatki", "Polnilna postaja", "Stojala", "Dodatki", "Slušalke,Vrsta izdelka", "Polnilna postaja,Vrsta izdelka",
            "Kabli,Vrsta izdelka", "Polnilci,Vrsta izdelka", "Kompleti,Vrsta izdelka", "Playstation dodatki", "Xbox dodatki,Vrsta izdelka",
            "Playstation dodatki,Vrsta izdelka", "Joy-Con,Vrsta izdelka", "Nintendo dodatki", "Igralni ploščki,Vrsta izdelka",
            "Gaming dodatki", "Nintendo dodatki,Vrsta izdelka", "Evercade", "Igralni ploščki", "Volani", "Igralni ploščki,,Vrsta izdelka",
            "Xbox dodatki", "EVERCADE", "Igralne palice in ploščki", "Joy-Con", "Volani,Vrsta izdelka"
        ],
        [cn.DRON]: ["Droni"],
        [cn.SLUSALKE]: ["Stojala za slušalke"],
        [cn.STOL]: ["Dodatki za gaming stole"]
    };

export default colbyCategoryMap;