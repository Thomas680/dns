import React, { useState, useEffect } from 'react';

const IP_SERVER = "http://192.168.1.2:3001";

const ListeAvecSuppression = (props) => {
  // const [elements, setElements] = useState([]);

  // se lance une fois, dès que le composant se monteeeeeeeeee
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(IP_SERVER + '/blacklist/');
        const data = await response.json();
        props.setElements(data.nomsDeZones); 
      } catch (error) {
        console.error('Erreur lors de la récupération des données depuis l\'API:', error);
      }
    };

    // Appel de la fonction pour récupérer les données dès que le composant est monté
    fetchData();
  }, []); 

  const supprimerElement = async (element) => {
    try {
      const response = await fetch(IP_SERVER + '/blacklist/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contenu: element }),
      });
  
      if (!response.ok) {
        console.error('Erreur lors de la requête vers le backend:', response.statusText);
        return;
      }
  
      const nouveauxElements = props.elements.filter((e) => e !== element);
      props.setElements(nouveauxElements);
    } catch (erreur) {
      console.error('Erreur lors de la requête:', erreur.message);
    }
  };

  return (
    <div>
      <h2>Liste des blacklists</h2>
      <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {props.elements.map((element, index) => (
            <li
              key={index}
              style={{
                borderBottom: index < props.elements.length - 1 ? '1px solid #ccc' : 'none',
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>{element}</span>
              <button onClick={() => supprimerElement(element)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListeAvecSuppression;
