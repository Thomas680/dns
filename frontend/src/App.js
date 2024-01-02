/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
// App.js
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
    <div className="app">
      <Sidebar onTabChange={handleTabChange} />
      <div className="content">
        {currentPage === 'home' && <Home />}
        {currentPage === 'blacklist' && <BlacklistPage />}
        {currentPage === 'whitelist' && <WhitelistPage />}
      </div>
    </div>
  );
};

export default App;
