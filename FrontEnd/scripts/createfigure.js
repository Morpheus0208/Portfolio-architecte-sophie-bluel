
// /** creation des card figures dans le parent .gallery sur la base des travaux passé en paramètres */
export function createFigure(workselement) {
  document.querySelector(".gallery").innerHTML = "";
  const gallery = document.querySelector(".gallery");
  for (const work of workselement) {
    const figureElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    const figcaptionElement = document.createElement("figcaption");
    
    /* creation des figures des travaux */
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;
    figcaptionElement.textContent = work.title;
    /* affichage des figures dans le DOM */
    figureElement.appendChild(imageElement);
    figureElement.appendChild(figcaptionElement);
    gallery.appendChild(figureElement);
};
}