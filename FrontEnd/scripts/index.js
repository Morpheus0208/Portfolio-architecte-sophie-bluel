import { getWork } from "./getwork.js";
import { getCategory } from "./getcategory.js";
import { buttonTous } from "./buttontous.js";
import { buttonsFilter } from "./buttonsfilter.js";
import { ecouteButtonFiltre } from "./ecoutebuttonfiltre.js";
import { createFigure } from "./createfigure.js";
/** recuperation des travaux depuis l'api du backend */
let works = await getWork();// variable globale pour réactualiser les travaux suite mise a jour api
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
    buttonModifier.addEventListener("click", async(event) => {
        event.preventDefault();
        reinitialiserModale();
        afficherModale();
        const updatedWorks = await getWork();
        afficherModalGallery(updatedWorks);
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
            afficherCategories();
            /*  ecoute des boutons de fermeture de la modale d'ajout de projet*/
            const closeAddProject = document.querySelector("#closeModalAddProject");
            closeAddProject.addEventListener("click", (event) => {
                event.preventDefault();
                effacerModaleAddProject();
            });
            /** ecoute de l'overlay pour fermer la modale d'ajout de projet*/
            const addProjectModal = document.querySelector("#addProjectModal");
            window.addEventListener("click", (event) => {
                if (event.target === addProjectModal) {
                    addProjectModal.classList.add('hidden');
                }
            });
            /** ecoute du bouton retour gallery */
            const buttonRetour = document.querySelector("#backToGallery");
            buttonRetour.addEventListener("click", (event) => {
                event.preventDefault();
                effacerModaleAddProject();
                afficherModale();
                afficherModalGallery(works);
            });
            /** validation de l'ensemble des champs du formulaire */
            const form = document.getElementById("addProjectForm");
            const inputs = form.querySelectorAll("input, select");
            inputs.forEach(input => {
                input.addEventListener("input", checkFormValidity);
                input.addEventListener("change", checkFormValidity); // pour le fichier et le select
            })
            /** ecoute du bouton ajouter photo */
            let imageFile=null;
            const imageInput = document.getElementById('imageUpload');
            imageInput.addEventListener('change', () => {
                imageFile= imageInput.files[0];
                if (verificationImage(imageFile)) {
                    afficherMiniature(imageFile);
                }
            });
            /** ecoute du bouton valider pour ajouter un projet */
            const buttonValider = document.querySelector("#addProjectValider");
            buttonValider.replaceWith(buttonValider.cloneNode(true));// Clone le bouton pour réinitialiser l'écouteur d'événements
            const nouveauButtonValider = document.querySelector("#addProjectValider");
            nouveauButtonValider.addEventListener("click", async(event) => {
                event.preventDefault();
                const token = localStorage.getItem("token");
                const formData = new FormData();
                const titleInput = document.querySelector("#addProjectTitre");
                const categorySelect = document.querySelector("#selectCategory");
                const title = titleInput.value;
                const categoryId = categorySelect.value;
                formData.append("title", title);
                formData.append("image", imageFile);
                formData.append("category", categoryId);
                try {
                    await fetch("http://localhost:5678/api/works", {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                        body: formData
                    });
                } catch (error) {
                    console.error("Erreur lors de l'ajout du projet :", error);
                }
                reinitialiserModaleAddProject();
                reinitialiserModale();
                reinitialiserGallery();
                effacerModaleAddProject();
                const works = await getWork();
                createFigure(works);
                afficherModalGallery(works)
            });
        }); 
    });
    }
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
 /** affichage  et effacement de la modale */
function afficherModale() {
    const modale=document.getElementById("modal");
    modale.classList.remove('hidden');
}
function effacerModale() {
    const modale= document.getElementById("modal");
    modale.classList.add('hidden');
}
/** afficher la gallery dans la modale */
function afficherModalGallery(workselement) {
    const modalGallery = document.querySelector("#modalGallery");
    modalGallery.innerHTML = "";
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
/** affichage de la modale ajouter un projet*/
function afficherModaleAddProject() {
    const addProjectModale=document.getElementById("addProjectModal");
    addProjectModale.classList.remove('hidden');
}
function effacerModaleAddProject() {
    const addProjectModale= document.getElementById("addProjectModal");
    addProjectModale.classList.add('hidden');
}
/** affichage des categories dans la modale d'ajout de projet */
async function afficherCategories() {
    try {
        const categories = await getCategory();
        const selectCategorie = document.querySelector("#selectCategory");
        selectCategorie.innerHTML = ""; 
        for (const category of categories) {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;
            selectCategorie.appendChild(option);
        }
    }
    catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
    }
}
/** verification des critères (type, taille) de fichier image dans la modale d'ajout de projet */
function verificationImage(file){ 
    const maxSizeOctet = 4 * 1024 * 1024; // 4 Mo
    if (!file) {
        alert("Aucun fichier sélectionné.");
        return;
    }
    if (!file.type.startsWith("image/")) {
        alert("Veuillez choisir un fichier image (jpg ou png).");
        return;
    }
    if (file.size > maxSizeOctet) {
        alert("L'image dépasse 4 Mo.");
        return;
    }
    else {
        const imageVerified=true;
        return imageVerified
    }
};
/** affichage en miniature du fichier image sélectionné */
function afficherMiniature(file){
    const reader = new FileReader();
    reader.onload = (event) => {
        const photoUpload = document.querySelector(".imageLabel");
        photoUpload.innerHTML = "";
        const imageMiniature = document.createElement("img");
        imageMiniature.classList.add("imageMiniature");
        imageMiniature.src = event.target.result;
        console.log("Image validée et affichée.");
        photoUpload.appendChild(imageMiniature);
    }
    reader.readAsDataURL(file);
};
/** permet de passer le bouton valider activé si tous les champs sont remplis */
function checkFormValidity() {
    const form = document.getElementById("addProjectForm");
    if (form.checkValidity()) {
        const buttonValider = document.querySelector("#addProjectValider");
        buttonValider.disabled = false; // Active le bouton
        buttonValider.classList.remove("projetKo");
        buttonValider.classList.add("projetOk");// Activer le bouton de validation
        console.log("Formulaire valide, bouton activé");
        return true;
    }
    else {
        const buttonValider = document.querySelector("#addProjectValider");
        buttonValider.disabled = true; // Désactive le bouton
        buttonValider.classList.remove("projetOk");
        buttonValider.classList.add("projetKo");// Desactiver le bouton de validation 
        console.log("Formulaire invalide, bouton désactivé");
        return false;
    }
};
/** permet de remettre a zero la modale add project */
function reinitialiserModaleAddProject() {
    const form = document.getElementById("addProjectForm");
    form.reset(); // Réinitialiser le formulaire
    const photoUpload = document.querySelector("#addProjectmodalContent");
    if (photoUpload) {
        photoUpload.innerHTML = `
            <button id="backToGallery"class="backToGallery"><i class="fa-solid fa-arrow-left"></i></button>
			<button id="closeModalAddProject" class="closeModal"><i class="fa-solid fa-xmark"></i></button>
			<h2>Ajout photo</h2>
			<form id="addProjectForm" enctype="multipart/form-data">
				<!-- partie ajout photo -->
				<div class="photoUpload">
					<label for="imageUpload" class="imageLabel">
						<i class="fa-regular fa-image"></i>
						<p id="boutonAddProject">+ Ajouter photo</p>
						<p id="formatImage">jpg, png : 4mo max</p>
						<input type="file" id="imageUpload" name="image" accept="image/png, image/jpeg" hidden>
					</label>
				</div>
				<!-- partie titre -->
				<label for="title">Titre</label>
				<input id="addProjectTitre"type="text" name="title"  required>
				<!-- partie catégorie -->
				<label for="category">Catégorie</label>
				<select id="selectCategory" name="category" required>
					<option value=""></option>
				</select>
				<!-- partie séparateur -->
				<div class="separateur">
				</div>
				<!-- partie validation ajout photo -->
				<button id="addProjectValider" class ="projetKo"type="submit" disabled>Valider</button>
			</form>`;
    }
}
/** permet de remettre a zero la modale  */
function reinitialiserModale() {
    const modalGallery = document.querySelector("#modalGallery");
    modalGallery.innerHTML = "";
}
/** permet de remettre a zero la gallery de la page index */
function reinitialiserGallery() {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
}   