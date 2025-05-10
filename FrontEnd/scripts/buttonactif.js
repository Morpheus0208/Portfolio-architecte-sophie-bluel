export function buttonActif(buttons,idselect) {
  document.querySelector(".categories").innerHTML = "";
  for (const button of buttons) {
    if (button.id === idselect) {
      button.classList.add('active');
      button.classList.remove('inactive');
    } else {
      button.classList.remove('active');
      button.classList.add('inactive');
    }
    /*  ajout des buttons cliqués dans le DOM */
  document.querySelector(".categories").appendChild(button);
  }
};