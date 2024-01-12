// Home.js
import React, {useEffect} from 'react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import BarChart from '../components/BarChart';
import Card from '../components/Card';
import FixedList from '../components/Fixedlist';

const Home = () => {

/*
  useEffect(() => {

    // Fonction pour récupérer les données depuis l'API
    const fetchData = async () => {
      try {
        const response = await fetch(IP_SERVER + '/blacklist/');
        const data = await response.json();
      } catch (error) {
        console.error('Erreur lors de la récupération des données depuis l\'API:', error);
      }
    };

    // lancement de le récupération des data dès que le composant est monté (init)
    fetchData();
  }, []); 
*/


  return (
    <div>
      <h1>Page d'accueil</h1>
      <div>
        <Card
            title="Card 1"
            description="Description de la carte 1."
            // imageUrl="https://example.com/image1.jpg"
          />
      </div>

      
      <div>

      </div>
     
    </div>
  );
};

export default Home;
