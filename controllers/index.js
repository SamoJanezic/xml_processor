import { AcordController } from "./AcordController.js";
import { AvteraController } from "./AvteraController.js";
import { ColbyController } from "./ColbyController.js";
import { ElkotexController } from "./ElkotexController.js";
import { EventusController } from "./EventusController.js";
import { AsbisController } from "./AsbisController.js";
import { AlsoController } from "./AlsoController.js";
import { LiebherrController } from "./LiebherrController.js";
import { GorenjeController } from "./GorenjeController.js";
import { BshController } from "./BshController.js";

export const controllerMap = {
    also: AlsoController,  //napaka z & (popravljena)
    acord: AcordController,  //dela
    avtera: AvteraController, //dela
    elkotex: ElkotexController, //problemi z dodatnimi lasnostmi neskončen loop
    eventus: EventusController, //dela fix not null constraint on idelek.ean
    asbis: AsbisController, //napaka z & (popravljena) fix not null constraint on idelek.ean
    colby: ColbyController, //dela
    liebherr: LiebherrController,
    gorenje: GorenjeController, // problem with attributes here
    bsh: BshController,
};