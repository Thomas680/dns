// Sidebar.js
import React from 'react';
import BoutonOnOff from '../components/BoutonOnOff';

const Sidebar = ({ onTabChange }) => {
  return (
    <div className="sidebar">
      <BoutonOnOff/>
      <button onClick={() => onTabChange('home')}>Accueil</button>
      <button onClick={() => onTabChange('administration')}>Administration</button>
      <button onClick={() => onTabChange('blacklist')}>blacklist</button>  
    </div>
  );
};

export default Sidebar;
