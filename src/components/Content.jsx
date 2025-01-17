import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Info from "../components/Info";

const Content = () => {
  const [data, setData] = useState(null);
  const { pTerme } = useParams();  // Récupère le terme dans l'URL
  const { titreId } = useParams();  // Récupère l'ID du titre dans l'URL (assurez-vous que l'URL contient bien cet ID)

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_LARAVEL_APP_DOMAIN_URL_API}/test/titre/${pTerme}`);
        setData(response.data.data);
      } catch (error) {
        console.log("Erreur lors du chargement des données :", error);
      }
    };

    fetchTerms();
  }, [pTerme]); // Lorsque `pTerme` change, la requête se relance

  // Si les données ne sont pas encore chargées, afficher un message de chargement
  if (!data) return <div>Chargement...</div>;

  // Filtrer les titres en fonction de l'ID (titreId) passé dans l'URL
  const titreSelectionne = data.titres.find(titre => titre.id === parseInt(titreId));

  // Filtrer les clés associées au titre sélectionné
  const clesPourTitre = titreSelectionne
    ? data.cles.filter(cle => cle.titre_id === titreSelectionne.id)
    : [];

  return (
    <div>
      <h1>{pTerme}</h1>

    
      <Info titres={data.titres} pTerme={pTerme} />

      <section className="p-4 w-50">

        {titreSelectionne ? (
          <>
            <h2 className="text-center fs-2 p-2 shadow" style={{ borderBottom: '.3rem solid green' }}>
              {titreSelectionne.titre}
            </h2>

          
            {clesPourTitre.length > 0 ? (
              clesPourTitre.map((cle) => (
                <div key={cle.id}>
                  <h3>{cle.cle}</h3>
                  <p>{cle.contente}</p>
                </div>
              ))
            ) : (
              <p>Aucune clé associée à ce titre.</p>
            )}
          </>
        ) : (
          <p>Titre non trouvé.</p>
        )}
      </section>
    </div>
  );
};

export default Content;
