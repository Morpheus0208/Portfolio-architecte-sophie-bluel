/* écoute des boutons filtres */
import { buttonActif } from "./buttonactif.js";
import { filtreWork } from "./filtrework.js";
import { createFigure } from "./createfigure.js";
export function ecouteButtonFiltre(works,categories) {
  const buttons = document.querySelectorAll(".categories button");
  for (let i=0;i<categories.length+1;i++){
    buttons[i].addEventListener("click", (event) => {
      const idselect=event.target.id;
      buttonActif(buttons,idselect);
      const filteredworks=filtreWork(works,idselect);
      /*  ajout des travaux filtrés dans le DOM */
      createFigure(filteredworks);

    });
  
  }
}