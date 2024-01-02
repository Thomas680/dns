// Home.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';

const Home = () => {
  return (
    <div>
      <h1>Page d'accueil</h1>
      <Sidebar />
      <Button onClick={() => console.log('Bouton cliqué')} label="Cliquez-moi" />
      {/* Autres contenus de la page d'accueil */}
    </div>
  );
};

export default Home;
