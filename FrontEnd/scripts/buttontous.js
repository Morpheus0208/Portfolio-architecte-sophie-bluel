/* creation et affichage du bouton de filtre Tous en dur avec un id égal au dernier id  de l'api backend  +1*/
export function buttonTous(categories){
  const buttonfiltertous = document.createElement("button");
  const lastid = categories[categories.length-1].id;
  buttonfiltertous.setAttribute("id", lastid + 1);
  buttonfiltertous.textContent = "Tous";
  buttonfiltertous.classList.add("inactive");
  document.querySelector(".categories").appendChild(buttonfiltertous);
}
  