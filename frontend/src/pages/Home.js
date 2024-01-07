// Home.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import BarChart from '../components/BarChart';
import Card from '../components/Card';
import FixedList from '../components/Fixedlist';

const Home = () => {


  return (
    <div>
      <h1>Page d'accueil</h1>
      <div>
        <Card
            title="Card 1"
            description="Description de la carte 1."
            imageUrl="https://example.com/image1.jpg"
          />
      </div>
      
      <div>

      </div>
     
    </div>
  );
};

export default Home;
