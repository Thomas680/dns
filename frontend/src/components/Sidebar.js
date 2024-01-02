// Sidebar.js
import React from 'react';

const Sidebar = ({ onTabChange }) => {
  return (
    <div className="sidebar">
      <button onClick={() => onTabChange('home')}>Accueil</button>
      <button onClick={() => onTabChange('blacklist')}>Blacklist</button>
      <button onClick={() => onTabChange('whitelist')}>Whitelist</button>
    </div>
  );
};

export default Sidebar;
