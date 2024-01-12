
import React, {useState, useEffect} from 'react';
import BlacklistForm from '../components/FormAddBlacklist';
import ListeAvecSuppression from '../components/Blacklist';
import { IP_SERVER } from '../constantes';

const AdministrationPage = () => {
  /*
  const [elements, setElements] = useState(() =>{
    const fetchData = async () => {
      try {
        const response = await fetch(IP_SERVER + '/blacklist/');
        const data = await response.json();
        setElements(data.nomsDeZones); 
      } catch (error) {
        console.error('Erreur lors de la récupération des données depuis l\'API:', error);
      }
    };

    // lancement de le récupération des data dès que le composant est monté (init)
    fetchData();
  });
*/
  // pour que les data soient init dès le départ 
  /*
  useEffect(() => {

    // Fonction pour récupérer les données depuis l'API
    const fetchData = async () => {
      try {
        const response = await fetch(IP_SERVER + '/blacklist/');
        const data = await response.json();
        setElements(data.nomsDeZones); 
      } catch (error) {
        console.error('Erreur lors de la récupération des données depuis l\'API:', error);
      }
    };

    // lancement de le récupération des data dès que le composant est monté (init)
    fetchData();
  }, []); 

*/

/*
  const mettreAJourElements = (nouveauxElements) => {
    setElements(nouveauxElements);
    
  };
*/
  // <ListeAvecSuppression elements={elements}/>

  const [elements, setElements] = useState([]);

  return (
    <div>
      <h1>Page admin</h1>
      <BlacklistForm elements={elements} setElements={setElements}/>
      <ListeAvecSuppression elements={elements} setElements={setElements}/>
    </div>
  );
};

export default AdministrationPage;
