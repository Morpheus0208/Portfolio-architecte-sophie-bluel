
// /** creation d'une card figure dans le parent .gallery */
export function createFigure(work) {
  const gallery = document.querySelector(".gallery");
  const figureElement = document.createElement("figure");
  const imageElement = document.createElement("img");
  const figcaptionElement = document.createElement("figcaption");
  imageElement.src = work.imageUrl;
  imageElement.alt = work.title;
  figcaptionElement.textContent = work.title;
  figureElement.appendChild(imageElement);
  figureElement.appendChild(figcaptionElement);
  gallery.appendChild(figureElement);
};