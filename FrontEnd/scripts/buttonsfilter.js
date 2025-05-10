/* creation et affichage des boutons de filtre issus de l'api backend */
export function buttonsFilter(categories){
    for (const category of categories) {
    const buttonfilter = document.createElement("button");
    buttonfilter.setAttribute("id", category.id);
    buttonfilter.textContent = category.name;
    buttonfilter.classList.add("inactive");
    document.querySelector(".categories").appendChild(buttonfilter);
    }
}