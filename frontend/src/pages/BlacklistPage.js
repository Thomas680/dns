
import React from 'react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';

const BlacklistPage = () => {
  return (
    <div>
      <h1>Page blacklist</h1>
      
      <Button onClick={() => console.log('Bouton cliqué')} label="Cliquez-moi" />
      {/* Autres contenus de la page d'accueil */}
    </div>
  );
};

export default BlacklistPage;
