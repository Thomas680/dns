
import React from 'react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import BlacklistForm from '../components/FormAddBlacklist';
import ListeAvecSuppression from '../components/Blacklist';
const AdministrationPage = () => {
  return (
    <div>
      <h1>Page admin</h1>
      <BlacklistForm></BlacklistForm>
      <ListeAvecSuppression></ListeAvecSuppression>
      
    </div>
  );
};

export default AdministrationPage;
