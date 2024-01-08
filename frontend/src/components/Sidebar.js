// Sidebar.js
import React from 'react';

const Sidebar = ({ onTabChange }) => {
  return (
    <div className="sidebar">
      <button onClick={() => onTabChange('home')}>Accueil</button>
      <button onClick={() => onTabChange('administration')}>Administration</button>
    </div>
  );
};

export default Sidebar;
