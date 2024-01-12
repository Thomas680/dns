
const express = require('express');
const { exec, execSync } = require('child_process');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(cors());

const PORT =  3001; 

// Route qui permet d'initialiser le fichier de configuration db.blockedsites pour les blacklists
app.get('/', (req, res) => {
  res.send("OK").status(200);
  // const findCmd = 'sudo find /etc -name db.blockedsites';
  // const chemin = '/etc/bind/db.blockedsites';

  // exec(findCmd, (error, stdout, stderr) => {

  //   if (error) {
  //     console.error(`Erreur de la commande find : ${error.message}`);
  //   }

  //   // Le fichier existe
  //   if(stdout)
  //   {
  //     const contenuFichier = 
  //     `$TTL 86400\n@       IN      SOA     localhost. root.localhost. (
  //       \n                      1       ; Serial
  //       \n                      604800  ; Refresh
  //       \n                      86400   ; Retry
  //       \n                      2419200 ; Expire
  //       \n                      86400 ) ; Negative Cache TTL
      
  //       \n      IN      NS      localhost.
      
  //     \n@      IN      A       127.0.0.1`;

  //     fs.writeFile(chemin, contenuFichier, (erreur) => {
  //       if (erreur) {
  //         console.error(`Erreur de la commande writeFile : `, erreur);
  //       } else {
  //         const restartCmd = 'sudo service bind9 restart';
  //         exec(restartCmd, (error, stdout, stderr) => {

  //           if (error) {
  //             console.error(`Erreur lors du restart de bind : ${error.message}`);
  //           }

  //           res.send("fichier de config db.blockedsites complété").status(200);
  //         });
  //       }
  //     });  
  //   }else{
  //     res.send("fichier de config db.blockedsites n'existe pas").status(400);
  //   }

  // });
});


app.get('/etat', (req,res) => {
  const isActiveCmd = 'systemctl is-active bind9';

  exec(isActiveCmd, (error, stdout, stderr) => {
    if (error) {
        console.error(`Erreur lors de la cmd systemctl : ${stderr}`);
        res.status(500).send('Erreur lors de l\'exécution de la commande sysctl');
        return;
    }

    const statusB = stdout.trim();
    res.status(200).json({ status: statusB });
  });
});


// route pour lancer le serveur bind (écoute)
app.post('/start-server', (req, res) => {
  
  const startBindCmd = 'sudo service bind9 start';

  exec(startBindCmd, (error, stdout, stderr) => {

    if (error) {
      console.error(`Erreur lors du start de bind: ${error.message}`);
      return res.status(500);
    }

    res.send('Start de bind avec succès');
  });
});


// route pour arrêter le serveur bind 
app.post('/stop-server', (req, res) => {

  const stopBindCmd = 'sudo service bind9 stop';

  exec(stopBindCmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors de l'arrêt de bind: ${error.message}`);
      return res.status(500).send('Erreur lors de l\'arrêt de bind');
    }

    res.send('Arrêt bind ok');
  });
});


// BLACKLIST

// Route pour lister toutes les blacklist
app.get('/blacklist/', (req, res) => {
    const findCmd = 'sudo find /etc -name named.conf.local';

    exec(findCmd, (error, stdout, stderr) => {
        if (error) {
          console.error(`Erreur lors de la recherche du fichier de config: ${error.message}`);
          return res.status(500).send('lors de la recherche du fichier de config');
        }

        if(stdout)
        {
          const chemin = '/etc/bind/named.conf.local';

          fs.readFile(chemin, 'utf-8', (erreur, contenu) => {
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
        
            //console.log('Noms de zones :', nomsDeZones);
        
            const jsonResultat = { nomsDeZones };
            //console.log('Le JSON :', JSON.stringify(jsonResultat, null, 2));
        
            res.json(jsonResultat);
          });
        }
            
      });
})


// Route qui permet d'ajouter des blacklists
app.post('/blacklist/add', (req, res) => {
  
  const { contenu } = req.body;
  console.log(contenu);

  if (!contenu || !Array.isArray(contenu)) {
    return res.status(400).send('Pas de contenu ou input invalide');
  }
  
  const chemin = '/etc/bind/named.conf.local';

  try {
    contenu.forEach((item) => {

      console.log(`grep ${item} /etc/bind/named.conf.local`);
      const checkCmd = `grep ${item} /etc/bind/*.local`;
      //const checkCmd = `grep ${item} /etc/bind/named.conf.local`;

      let resultCheckCmd = execSync(checkCmd, {encoding: "utf8"}).trimEnd();
      console.log("Result check cmd : " + resultCheckCmd);

      if(!resultCheckCmd)
      {
        const contentToWrite = `\nzone "${item}" {\n    type master;\n    file "/etc/bind/db.blockedsites";\n};\n`;
        fs.appendFile(chemin, contentToWrite, (erreur) => {
          console.log("Writing file");
          if (erreur) {
            console.error('Erreur lors du write :', erreur);
          } else {
            console.log("Writing OK");
            const restartBindCmd = 'sudo service bind9 restart';
            let resultRestartBindCmd = execSync(restartBindCmd, {encoding: "utf8"}).trimEnd();
            console.log("Bind restarted");
          }
        }); 
      }

      // exec(checkCmd, (error, stdout, stderr) => {

      //   if (error) {
      //     console.error(`Erreur lors du grep : ${error.message}`);
      //   }
        
      //   // la blacklist n'existe pas dans la liste
      //   if(!stdout)
      //   {
      //     const c = `\nzone "${item}" {\n    type master;\n    file "/etc/bind/db.blockedsites";\n};\n`;
    
      //     fs.appendFile(chemin, c, (erreur) => {
      //       if (erreur) {
      //         console.error('Erreur lors du write :', erreur);
      //       } else {
      //           exec(cmd, (error, stdout, stderr) => {
      
      //             if (error) {
      //               console.error(`Erreur lors du restart de bind9: ${error.message}`);
      //             }
      //           });
      //       }
      //     }); 
      //   }else{
      //     console.log("Cette zone existe déjà");
      //   }
        
      // });
    });
  }
  catch(error)
  {
    console.log(error);
    res.send().status(500);
  }
  
  res.send().status(200);
});


// Route qui permet de supprimer une blacklist
app.post('/blacklist/delete', (req, res) => {

  try {
    const { contenu } = req.body;

    let cmdGetLigne = `grep -n ${contenu} /etc/bind/*.local` ;
    let resultCmdGetLigne = execSync(cmdGetLigne, {encoding: "utf8"}).trimEnd();
    console.log("Résultat commande : " + resultCmdGetLigne);

    const numLigne = resultCmdGetLigne.split(':')[1];
    console.log("Numéro de ligne : " + numLigne);
    const numFin = parseInt(numLigne) +3;
    console.log("Numéro de ligne de fin : " + numFin);

    const cmdDelete = `sed '${numLigne},${numFin}d' /etc/bind/named.conf.local`;
    let resultCmdDelete = execSync(cmdDelete, {encoding: "utf8"}).trimEnd();
    console.log("Resultat delete : ");
    console.log(resultCmdDelete);

    const chemin = '/etc/bind/named.conf.local';

    fs.writeFile(chemin, resultCmdDelete, (erreur) => {
      console.log("Write file");
      if (erreur) {
        console.error('Erreur lors du write :', erreur);
      } else {
        console.log("Write file OK");
        const restartBindCmd = 'sudo service bind9 restart';
        let resultRestartBindCmd = execSync(restartBindCmd, {encoding: "utf8"}).trimEnd();
        console.log("Bind restarted");
      }
    });  
  } 
  catch(error)
  {
    console.log(error);
    res.send().status(500);
  }
  res.send().status(200);
});


// STATS 

app.get('/stats', (req,res) => {
  const statCmd = 'sudo rndc -s 127.0.0.1 -p 8053 stats';

  exec(statCmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors de la recherche du fichier de config: ${error.message}`);
      return res.status(500).send('lors de la recherche du fichier de config');
    }



  });
});





// WHITELIST
app.get('/whitelist/', (req, res) => {

});

app.post('/whitelist/add', (req, res) => {
 
});

app.get('/whitelist/delete', (req, res) => {
  
});





app.listen(PORT, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${PORT}`);
});
