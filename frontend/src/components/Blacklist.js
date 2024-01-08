import React, { useState, useEffect } from 'react';

const ListeAvecSuppression = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les données depuis l'API
    const fetchData = async () => {
      try {
        // Remplacez l'URL de l'API par l'URL réelle
        const response = await fetch('http://localhost:3001/blacklist/');
        const data = await response.json();
        setElements(data.nomsDeZones); // Assurez-vous que la structure de données correspond à ce dont vous avez besoin
      } catch (error) {
        console.error('Erreur lors de la récupération des données depuis l\'API:', error);
      }
    };

    // Appel de la fonction pour récupérer les données dès que le composant est monté
    fetchData();
  }, []); // Le tableau vide en tant que deuxième argument signifie que cela ne dépend d'aucune dépendance, donc cela s'exécute une fois après le montage initial.

  const supprimerElement = (index) => {
    const nouveauxElements = [...elements];
    nouveauxElements.splice(index, 1);
    setElements(nouveauxElements);
  };

  return (
    <div>
      <h2>Liste des blacklists</h2>
      <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {elements.map((element, index) => (
            <li
              key={index}
              style={{
                borderBottom: index < elements.length - 1 ? '1px solid #ccc' : 'none',
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>{element}</span>
              <button onClick={() => supprimerElement(index)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListeAvecSuppression;
