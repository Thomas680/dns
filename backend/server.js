

const express = require('express');

const { exec } = require('child_process');

const fs = require('fs');

const app = express();

const PORT =  3001; 


app.get('/', (req, res) => {
  // res.send('hello hello');
  const a = 'sudo find db.blockedsites';

///////////////////////////////////////////////////////////

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
    const cmd = 'sudo find /etc -name named.conf';

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.error(`Erreur lors de la recherche du fichier de config: ${error.message}`);
          return res.status(500).send('lors de la recherche du fichier de config');
        }
    
        console.log(`recherche du fichier de config ok`);
        res.send('recherche du fichier de config ok');
      });
})

app.post('/blacklist/add', (req, res) => {

  //const { contenu } = req.body;
  
  const lien = '/etc/bind/named.conf.local';
   
  const cmd = 'sudo service bind9 restart';

  let contenu = "twitch.tv";

  let c = `zone "${contenu}" {\ntype master;\nfile "/etc/bind/db.blocked";\n};`

  const check = `grep ${contenu} /etc/bind/*.local`;
  exec(check, (error, stdout, stderr) => {

    if (error) {
      console.error(`Erreur lors : ${error.message}`);
      
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
    
    // il en exite déjà un 
    console.log(`res : ${stdout}`);
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
  const { element } = req.body;
  // ajouter à la blacklist 
  res.status(200).json({ message: 'Élément ajouté avec succès à la liste noire.' });
});

app.get('/whitelist/delete', (req, res) => {
  
});





app.listen(PORT, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${PORT}`);
});
