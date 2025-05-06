/* fonction pour récupérer les travaux de l'api back end */

export async function getWork() {
  try {
  const works = await fetch("http://localhost:5678/api/works");
  const work = await works.json();
  return work;
  }
  catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}