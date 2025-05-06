import { getWork } from "./getwork.js";
import { createFigure } from "./createfigure.js";
/**
 * gère l'affichage et les interactions de la page d'accueil
 */
/** recuperation des travaux depuis l'api du backend */
const work = await getWork();
/** creation d'une card figure pour chaque travail récupérés du back end */
for (let i = 0; i < work.length; i++) {
  const datawork = work[i];
  createFigure(datawork);
}
