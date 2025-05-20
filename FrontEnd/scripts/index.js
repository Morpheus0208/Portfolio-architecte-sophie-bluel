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
if (token==="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc0NzY3MjY0MCwiZXhwIjoxNzQ3NzU5MDQwfQ.kbFIasARJC3rWeYph7d5wuRlQkGMsl8kdwC0qQq-Gnw"){
    afficherBandeauModification();
    supprimerFiltres();   
    afficherButtonModifier();
     /** ecoute du bouton modifier */
    const buttonModifier = document.querySelector(".modifier");
    buttonModifier.addEventListener("click", () => {
        afficherModale();
        afficherModalGallery(works);
        /** fermer la modale avec la croix*/
        const closeModale = document.querySelector("#closeModal");
        closeModale.addEventListener("click", () => {
            modale.style.display = "none";
        });
        /** fermer la modale en cliquant l'overlay*/
        const modale = document.querySelector("#modal");
        window.addEventListener("click", (event) => {
            if (event.target === modale) {
                modale.style.display = "none";
            }
        });
        /** ecoute des icones corbeille et supression du projet */
        const deleteIcons = document.querySelectorAll(".fa-trash-can");
        deleteIcons.forEach((icon) => {
            icon.addEventListener("click", (event) => {
                console.log ("event.target", event.target);
                console.log("classe event"+event.target.parentElement.classList[0])
                const figureElementsToRemove = document.querySelectorAll("."+event.target.parentElement.classList[0]); 
                figureElementsToRemove.forEach((figureElement) => {
                    figureElement.remove();
                });

            });
        });
    });   
}; 
/** creation du bandeau de modification */
function afficherBandeauModification() {
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
}

/** supression des boutons filtres */
function supprimerFiltres() {
    const buttonFilter = document.querySelector(".categories");
    buttonFilter.remove();
}

/** creation du bouton modifier */
function afficherButtonModifier() {
    const portfolio = document.querySelector(".titreProjets");
    const buttonModifier = document.createElement("button");
    buttonModifier.textContent="modifier";
    buttonModifier.classList.add("modifier");
    const IconeBoutonModifier = document.createElement("i");
    IconeBoutonModifier.classList.add("fa-regular", "fa-pen-to-square");
    buttonModifier.prepend(IconeBoutonModifier);
    portfolio.appendChild(buttonModifier);
}

 /** affichage de la modale */
function afficherModale() {
    const modale=document.getElementById("modal");
    modale.style.display = "block";
}

/** afficher la gallery dans la modale */
function afficherModalGallery(workselement) {
    document.querySelector("#modalGallery").innerHTML = "";
    const modalGallery = document.querySelector("#modalGallery");
    for (const work of workselement) {
        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const iconeFigure = document.createElement("i");
        figureElement.classList.add("id"+work.id);
        iconeFigure.classList.add("fa-regular", "fa-trash-can");
        /* creation des figures des travaux */
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;
        /* affichage des figures dans le DOM */
        figureElement.appendChild(imageElement);
        figureElement.appendChild(iconeFigure);
        modalGallery.appendChild(figureElement);
    }
}