/* fonction pour récupérer les travaux de l'api back end */

export async function getWork() {
  try {
  const response= await fetch("http://localhost:5678/api/works");
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des travaux");
  }
  const works = await response.json();
  return works;
  }
  catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}