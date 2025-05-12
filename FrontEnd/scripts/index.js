import { getWork } from "./getwork.js";
import { getCategory } from "./getcategory.js";
import { buttonTous } from "./buttontous.js";
import { buttonsFilter } from "./buttonsfilter.js";
import { ecouteButtonFiltre } from "./ecoutebuttonfiltre.js";
import { createFigure } from "./createfigure.js";
/**
 * gère l'affichage et les interactions de la page d'accueil
 */
/** recuperation des travaux depuis l'api du backend */
const works = await getWork();
createFigure(works);
/** recuperation des categories de travaux depuis l'api du backend */
const categories = await getCategory();
/* creation et affichage du button tous */
buttonTous(categories);
/* creation et affichage des boutons de filtre issus de l'api backend */
buttonsFilter(categories);
/* écoute des boutons filtres*/ 
ecouteButtonFiltre(works, categories);