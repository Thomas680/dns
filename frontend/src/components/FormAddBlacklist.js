import React, { useState } from 'react';

const IP_SERVER = "http://192.168.1.2:3001";

const BlacklistForm = (props) => {

  const [mode, setMode] = useState('manuel'); 
  const [texteManuel, setTexteManuel] = useState('');
  const [fichier, setFichier] = useState(null);

  const modeChange = (nouveauMode) => {
    setMode(nouveauMode);
  };

  const handleTexteManuelChange = (e) => {
    setTexteManuel(e.target.value);
  };

  const handleFichierChange = (e) => {
    const fichierSelectionne = e.target.files[0];
    setFichier(fichierSelectionne);
  };

  const envoieBlacklist = async (donnees) => {
    try {
        //console.log(donnees);
        const response = await fetch(IP_SERVER + '/blacklist/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(donnees),
        });
  
        if (!response.ok) {
          console.error('Erreur lors de la requête vers le backend:', response.statusText);
        
        } else {
          let monTableau = props.elements.concat(donnees.contenu);
          props.setElements(monTableau);
        }
      } catch (erreur) {
        console.error('Erreur lors de la requête:', erreur.message);
      }
  };

  const validation = async () => {
    if (mode === 'manuel') {
        //console.log('Texte manuel:', texteManuel);
        await envoieBlacklist({ contenu: [texteManuel] });
      } else {
        //console.log('Fichier:', fichier);
  
        // Adaptation pour envoyer une liste depuis un fichier
        const reader = new FileReader();
        reader.onload = async (e) => {
          const contenuFichier = e.target.result.split('\n').map((monSite) => monSite.trim());
          await envoieBlacklist({ contenu: contenuFichier });
        };
        reader.readAsText(fichier);
      }
  };



  return (
    <div>
      <label>
        <input
          type="radio"
          value="manuel"
          checked={mode === 'manuel'}
          onChange={() => modeChange('manuel')}
        />
        Manuel
      </label>
      <label>
        <input
          type="radio"
          value="fichier"
          checked={mode === 'fichier'}
          onChange={() => modeChange('fichier')}
        />
        Fichier
      </label>

      {mode === 'manuel' && (
        <div>
          <label>
            Texte Manuel:
            <input type="text" value={texteManuel} onChange={handleTexteManuelChange} />
          </label>
        </div>
      )}

      {mode === 'fichier' && (
        <div>
          <input type="file" onChange={handleFichierChange} />
        </div>
      )}

      <button onClick={validation}>Valider</button>
    </div>
  );
};

export default BlacklistForm;