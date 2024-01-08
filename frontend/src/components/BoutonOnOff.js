import React, { useState, useEffect } from 'react';

const BoutonOnOff = () => {
  const [etatServeur, setEtatServeur] = useState();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/etat');
        const data = await response.json();
        let res = false;
        if(data.status === 'active')
        {
          console.log(`STATE ${data.status}`);
          res = true;
        }
        setEtatServeur(res); 
      } catch (error) {
        console.error('Erreur lors de la récupération des données depuis l\'API:', error);
      }
    };

    // lancement de le récupération des data dès que le composant est monté (init)
    fetchData();
  }, []); 


  const basculerEtatServeur = () => {
    setEtatServeur((prevEtat) => !prevEtat);

    const url = etatServeur ? 'http://localhost:3001/stop-server' : 'http://localhost:3001/start-server';

    fetch(url, {
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          console.error('Erreur lors de la requête vers le backend:', response.statusText);
        } else {
          return response.text();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la requête:', error.message);
      });
  };

  return (
    <div>
      <button onClick={basculerEtatServeur}>{etatServeur ? 'Éteindre' : 'Allumer'}</button>
    </div>
  );
};

export default BoutonOnOff;