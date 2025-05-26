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
console.log("token d'identification", token);
if (token){
    afficherBandeauModification();
    supprimerFiltres();   
    afficherButtonModifier();
    /** ecoute du lien logout  et effacement du token*/
    const logout = document.querySelector("#logout");
    logout.addEventListener("click", (event) => {
        event.preventDefault();
        localStorage.removeItem("token");
        window.location.href = "index.html";        
    });
     /** ecoute du bouton modifier */
    const buttonModifier = document.querySelector(".modifier");
    buttonModifier.addEventListener("click", (event) => {
        event.preventDefault();
        afficherModale();
        afficherModalGallery(works);
        /** fermer la modale avec la croix*/
        const closeModale = document.querySelector(".closeModal");
        closeModale.addEventListener("click", (event) => {
            event.preventDefault();
            modale.style.display = "none";
        });
        /** fermer la modale en cliquant l'overlay*/
        const modale = document.querySelector("#modal");
        window.addEventListener("click", (event) => {
            if (event.target === modale) {
                modale.style.display = "none";
            }
        });
        /** ecoute des icones corbeille et suppression du projet */
        const deleteIcons = document.querySelectorAll(".fa-trash-can");
        deleteIcons.forEach((icon) => {
            icon.addEventListener("click", (event) => {
                event.preventDefault();
                deleteProject(event,token);
            });
        });
        /** ecoute du bouton ajouter une photo */
        const buttonAddPhoto = document.querySelector("#addProject");
        buttonAddPhoto.addEventListener("click", (event) => {
            /* Affichage de la modale d'ajout de projet */
            event.preventDefault();
            effacerModale();
            afficherModaleAddProject();
            /*  ecoute des boutons de fermeture de la modale d'ajout de projet*/
            const addProjectModale = document.querySelector("#addProjectModal");
            const closeAddProject = document.querySelector(".closeModal");
            closeAddProject.addEventListener("click", (event) => {
                event.preventDefault();
                addProjectModale.classList.add('hidden');
            });
            /** ecoute de l'overlay pour fermer la modale d'ajout de projet*/
            window.addEventListener("click", (event) => {
                if (event.target === closeModalAddProject) {
                    const addProjectModale = document.querySelector("#addProjectModal")
                    addProjectModale.classList.add('hidden');
                }
            });
        });
    });
    /** ecoute du bouton fermeture modale */
    
    }; 
/** creation du bandeau de modification et remplacement login par logout */
function afficherBandeauModification() {
    /** creation du bandeau de modification  */
    const modeEdition = document.querySelector("body");
    const editionDiv =document.createElement("div");
    editionDiv.classList.add("edition");
    const contentEditionDiv = document.createElement("div");
    contentEditionDiv.classList.add("content-edition"); 
    const editionIcone=document.createElement("i");
    editionIcone.classList.add("fa-solid", "fa-pen-to-square");
    const editionText=document.createElement("p");
    editionText.textContent="Mode édition";
    /** remplacement login par logout */
    const login = document.querySelector("#login");
    const logout = document.createElement("a"); 
    logout.id="logout";
    logout.textContent="logout";
    logout.href="index.html";
    login.parentNode.replaceChild(logout, login);
    /** affichage du bandeau d'édition */
    contentEditionDiv.appendChild(editionIcone);
    contentEditionDiv.appendChild(editionText);
    editionDiv.appendChild(contentEditionDiv);
    modeEdition.prepend(editionDiv);
}

/** suppression des boutons filtres */
function supprimerFiltres() {
    const buttonFilter = document.querySelector(".categories");
    buttonFilter.remove();
}

/** creation du bouton modifier */
function afficherButtonModifier() {
    const portfolio = document.querySelector(".titreProjets");
    const buttonModifier = document.createElement("button");
    buttonModifier.type="button";
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
    modale.classList.remove('hidden');
}
function effacerModale() {
    const modale= document.getElementById("modal");
    modale.classList.add('hidden');
}
function afficherModaleAddProject() {
    const addProjectModale=document.getElementById("addProjectModal");
    addProjectModale.classList.remove('hidden');
}
function effacerModaleAddProject() {
    const addProjectModale= document.getElementById("addProjectModal");
    addProjectModale.classList.add('hidden');
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
/** ecoute des icones corbeille et suppression du projet */
async function deleteProject(event,token) {
    event.preventDefault();
    const classId=event.target.parentElement.classList[0];
    const figureElementsToRemove = document.querySelectorAll("."+classId);
    const id = parseInt(classId.substring(2));
    try {
        await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
        });
        figureElementsToRemove.forEach((figureElement) => {
        figureElement.remove();
        });
    }
    catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}
    /*  const modalContent = document.querySelector("#addProjectModal");
    const divAjoutTitre = document.createElement("div");
    divAjoutTitre.classList.add("ajout-titre");
    const inputAjoutTitre = document.createElement("input");
    inputAjoutTitre.type="text";
    inputAjoutTitre.name="title";
    inputAjoutTitre.id="title";
    inputAjoutTitre.placeholder="Titre";
    const labelInputAjoutTitre = document.createElement("label");
    labelInputAjoutTitre.setAttribute("for", "title");
    labelInputAjoutTitre.textContent="Titre";
    divAjoutTitre.appendChild(inputAjoutTitre);
    divAjoutTitre.appendChild(labelInputAjoutTitre);
    modalContent.appendChild(divAjoutTitre);

    const divAjoutCategorie = document.createElement("div");
    divAjoutCategorie.classList.add("ajout-categorie");
    const selectCategorie = document.createElement("select");
    selectCategorie.name="category";
    selectCategorie.id="category";
    selectCategorie.required=true;
    const labelInputSelectCategorie = document.createElement("label");
    labelInputSelectCategorie.setAttribute("for", "category");
    labelInputSelectCategorie.textContent="Catégorie";
    
    for (const category of categories) {
        const option = document.createElement("option");
        option.value=category.id;
        option.textContent=category.name;
        selectCategorie.appendChild(option);
    }
    
    divAjoutCategorie.appendChild(selectCategorie);
    divAjoutCategorie.appendChild(labelInputSelectCategorie);
    
    modalContent.appendChild(divAjoutCategorie);

    const buttonValider = document.createElement("button");
    buttonValider.type="submit";
    buttonValider.textContent="Valider";
    buttonValider.id="valider";
    
    modalContent.appendChild(buttonValider);*/

