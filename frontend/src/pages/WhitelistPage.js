
import React from 'react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';

const WhitelistPage = () => {
  return (
    <div>
      <h1>Page whitelist</h1>
      
      <Button onClick={() => console.log('Bouton cliqué')} label="Cliquez-moi" />
      {/* Autres contenus de la page d'accueil */}
    </div>
  );
};

export default WhitelistPage;
