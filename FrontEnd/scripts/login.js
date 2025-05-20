/**
 * gère l'affichage et les interactions de la page login
 */

/** récupération du token d'identification */
async function getToken(email, password) {
  try{
      const response = await fetch("http://localhost:5678/api/users/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      const userData = await response.json();
      const token= userData.token;
      return token;
  }
  catch( error) {
    console.error("Erreur lors de la récupération du token :", error);
  }
}

/** ecoute du bouton submit du formulaire  */
 function ecouteButtonLogin(){
  const button = document.querySelector("#submit");
  button.addEventListener("click", async (event) => {
  event.preventDefault();
  const email= document.querySelector("#email").value;
  const password= document.querySelector("#password").value;
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  const loginData = {
    email: "sophie.bluel@test.tld",
    password: "S0phie"
  };
  if (email === loginData.email && password === loginData.password) {
    const token = await getToken(email, password);
    console.log(token);
    // Stocker le token dans le localStorage 
    localStorage.setItem("token", token);
    // Redirection vers la page d'accueil
    window.location.href = "index.html";
  }
  else {
    // Afficher un message d'erreur ou effectuer une autre action
    const loginForm = document.querySelector("#form");
    // Supprimer le message d'erreur précédent s'il existe
    const existingErrorMessage = loginForm.querySelector("p");
    if (existingErrorMessage) {
      loginForm.removeChild(existingErrorMessage);
    }
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Erreur dans l’identifiant ou le mot de passe";
    errorMessage.style.color = "red";
    errorMessage.style.textAlign = "center";
    errorMessage.style.padding = "10px";
    loginForm.appendChild(errorMessage);
  }
});
}



ecouteButtonLogin();