/* fonction pour récupérer les categories depuis l'api back end */

export async function getCategory() {
  try {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  return categories;
  }
  catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}