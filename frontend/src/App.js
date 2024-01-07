
import React, { useState } from 'react';
import Home from './pages/Home';
import BlacklistPage from './pages/BlacklistPage';
import WhitelistPage from './pages/WhitelistPage';
import Sidebar from './components/Sidebar';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleTabChange = (tab) => {
    setCurrentPage(tab);
  };

  return (
    <div className="App">
      <Sidebar className="sidebar" onTabChange={handleTabChange} />
      <div className="main-content" >
        {currentPage === 'home' && <Home />}
        {currentPage === 'blacklist' && <BlacklistPage />}
        {currentPage === 'whitelist' && <WhitelistPage />}
      </div>
    </div>
  );
};

export default App;
