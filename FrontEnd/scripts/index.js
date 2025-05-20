import { getWork } from "./getwork.js";
import { getCategory } from "./getcategory.js";
import { buttonTous } from "./buttontous.js";
import { buttonsFilter } from "./buttonsfilter.js";
import { ecouteButtonFiltre } from "./ecoutebuttonfiltre.js";
import { createFigure } from "./createfigure.js";

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
/** affichage de la page en mode edition */
const token = localStorage.getItem("token");   
console.log("le token est :",token); 
console.log(token==="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc0NzY3MjY0MCwiZXhwIjoxNzQ3NzU5MDQwfQ.kbFIasARJC3rWeYph7d5wuRlQkGMsl8kdwC0qQq-Gnw");
if (token==="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc0NzY3MjY0MCwiZXhwIjoxNzQ3NzU5MDQwfQ.kbFIasARJC3rWeYph7d5wuRlQkGMsl8kdwC0qQq-Gnw"){
   /** creation du bandeau de modification */
    console.log("creation du mode edition");
    const modeEdition = document.querySelector("body");
    const editionDiv =document.createElement("div");
    editionDiv.classList.add("edition");
    const contentEditionDiv = document.createElement("div");
    contentEditionDiv.classList.add("content-edition"); 
    const editionIcone=document.createElement("i");
    editionIcone.classList.add("fa-solid", "fa-pen-to-square");
    const editionText=document.createElement("p");
    editionText.textContent="Mode édition";
    /** affichage du bandeau d'édition */
    contentEditionDiv.appendChild(editionIcone);
    contentEditionDiv.appendChild(editionText);
    editionDiv.appendChild(contentEditionDiv);
    modeEdition.prepend(editionDiv);
    /** supression des boutons filtres */
    const buttonFilter = document.querySelector(".categories");
    buttonFilter.remove();
    /** creation du bouton modifier */
    const portfolio = document.querySelector(".titreProjets");
    const buttonModifier = document.createElement("button");
    buttonModifier.textContent="modifier";
    buttonModifier.classList.add("modifier");
    const IconeBoutonModifier = document.createElement("i");
    IconeBoutonModifier.classList.add("fa-solid", "fa-pen-to-square");
    buttonModifier.prepend(IconeBoutonModifier);
    portfolio.appendChild(buttonModifier);   
};
