import React, { useEffect } from 'react';

const ListeAvecSuppression = ({ elements, setElements }) => {
  
  

  
  const supprimerElement = (element) => {
  };
 


  return (
    <div>
      <h2>Liste des blacklists</h2>
      <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {elements.map((element, index) => (
            <li
              key={index}
              style={{
                borderBottom: index < elements.length - 1 ? '1px solid #ccc' : 'none',
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>{element}</span>
              <button onClick={() => supprimerElement(element)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
};

export default ListeAvecSuppression;