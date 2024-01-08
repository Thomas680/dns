
const express = require('express');

const { exec } = require('child_process');

const cors = require('cors');

const fs = require('fs');

const app = express();

app.use(express.json());

app.use(cors());

const PORT =  3001; 


app.get('/', (req, res) => {
  const findCmd = 'sudo find /etc -name db.blockedsites';
  const lien = '/etc/bind/db.blockedsites';

  exec(findCmd, (error, stdout, stderr) => {

    if (error) {
      console.error(`Erreur lors de de la recherche du fichier db.blockedsites : ${error.message}`);
    }

    const contenuFichier = 
    `$TTL 86400\n@       IN      SOA     localhost. root.localhost. (
      \n                      1       ; Serial
      \n                      604800  ; Refresh
      \n                      86400   ; Retry
      \n                      2419200 ; Expire
      \n                      86400 ) ; Negative Cache TTL
    
      \n      IN      NS      localhost.
    
    \n@      IN      A       127.0.0.1`;

    fs.writeFile(lien, contenuFichier, (erreur) => {
      if (erreur) {
        console.error(`Erreur lors de l'écriture dans le fichier ds.blockedsites : `, erreur);
      } else {

        const restartCmd = 'sudo service bind9 restart';
        exec(restartCmd, (error, stdout, stderr) => {

          if (error) {
            console.error(`Erreur lors du restart de bind : ${error.message}`);
          }

          res.send("fichier de config db.blockedsites ").status(200);
        });
      }
    });  
  });

});

// route pour lancer le serveur bind (écoute)
app.post('/start-server', (req, res) => {
  
  const cmd = 'sudo service bind9 start';

  exec(cmd, (error, stdout, stderr) => {

    if (error) {
      console.error(`Erreur lors du start de bind: ${error.message}`);
      return res.status(500);
    }

    console.log(`Start de bind ok`);
    res.send('Start de bind avec succès');
  });
});

// route pour arrêter le serveur bind 
app.post('/stop-server', (req, res) => {

  const cmd = 'sudo service bind9 stop';

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors de l'arrêt de bind: ${error.message}`);
      return res.status(500).send('Erreur lors de l\'arrêt de bind');
    }

    console.log(`Arrêt de bind ok`);
    res.send('Arrêt bind ok');
  });
});


// BLACKLIST
app.get('/blacklist/', (req, res) => {
    const cmd = 'sudo find /etc -name named.conf.local';

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.error(`Erreur lors de la recherche du fichier de config: ${error.message}`);
          return res.status(500).send('lors de la recherche du fichier de config');
        }
    
        console.log(`recherche du fichier de config ok`);

        const lien = '/etc/bind/named.conf.local';

        fs.readFile(lien, 'utf-8', (erreur, contenu) => {
          if (erreur) {
              console.error('Erreur lors de la lecture du fichier :', erreur);
              return;
          }
      
          const chercherzone = /zone\s+"([^"]+)"/g;
          const nomsDeZones = [];
          let match;
      
          while ((match = chercherzone.exec(contenu)) !== null) {
              nomsDeZones.push(match[1]);
          }
      
          // Afficher les noms de zones.
          console.log('Noms de zones :', nomsDeZones);
      
          // Convertir les noms de zones en objet JSON si nécessaire.
          const jsonResultat = { nomsDeZones };

          res.json(jsonResultat).send('BLACKLIST LISTING OK');
      
          // Afficher l'objet JSON résultant.
          console.log('Résultat en JSON :', JSON.stringify(jsonResultat, null, 2));
      });

        
      });
})




app.post('/blacklist/add', (req, res) => {
  console.log(req.body);
  const { contenu } = req.body;

  if (!contenu || !Array.isArray(contenu)) {
    return res.status(400).send('Pas de contenu ou input invalide');
  }
  
  const lien = '/etc/bind/named.conf.local';
   
  const cmd = 'sudo service bind9 restart';

  //let contenu = "twitch.tv";

  contenu.forEach((item) => {

    const check = `grep ${contenu} /etc/bind/*.local`;

    exec(check, (error, stdout, stderr) => {

      if (error) {
        // console.error(`Erreur lors : ${error.message}`);
        
        const c = `zone "${item}" {\ntype master;\nfile "/etc/bind/db.blocked";\n};`;
   
        fs.appendFile(lien, c, (erreur) => {
          if (erreur) {
            console.error('Erreur lors du write :', erreur);
          } else {
            console.log('Write des blacklist ok');
  
            exec(cmd, (error, stdout, stderr) => {
  
              if (error) {
                console.error(`Erreur lors : ${error.message}`);
              }
            });
          }
        });      
        
      }
      
      // il existe déjà dans la blacklist
      console.log(`res : ${stdout}`);
    });
  });

  res.send("tout est ok").status(200);
});

app.post('/blacklist/delete', (req, res) => {

  let contenu = "twitch.tv";

  let nombre = `grep -n ${contenu} /etc/bind/*.local` ;
  const lien = '/etc/bind/named.conf.local';

  exec(nombre, (error, stdout, stderr) => {

    if (error) {
      console.error(`Erreur lors : ${error.message}`);
    }
    //console.log(`nombre : ${stdout}`);
    
    const splitString = stdout.split(':');
    const numeroLigne = splitString[1];
    console.log(numeroLigne);

    const numFin = parseInt(numeroLigne) +3;

    const deleteb = `sed '${numeroLigne},${numFin}d' /etc/bind/named.conf.local`;
    console.log(deleteb);
    exec(deleteb, (error, stdout, stderr) => {

      if (error) {
        console.error(`Erreur lors : ${error.message}`);
      }
      console.log("là");

      fs.writeFile(lien, stdout, (erreur) => {
        if (erreur) {
          console.error('Erreur lors du write :', erreur);
        } else {
          console.log('Write des blacklist ok');
          const cmd = 'sudo service bind9 restart';
          exec(cmd, (error, stdout, stderr) => {

            if (error) {
              console.error(`Erreur lors : ${error.message}`);
            }
          });
        }
      });  
    });
  });

});








// WHITELIST
app.get('/whitelist/', (req, res) => {

})

app.post('/whitelist/add', (req, res) => {
 
});

app.get('/whitelist/delete', (req, res) => {
  
});





app.listen(PORT, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${PORT}`);
});
