const mysql = require('mysql');

/*const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Utilisateur MySQL
  password: '', // Mot de passe MySQL
  database: 'kammouv' // Nom de ta base de données
});
*/



const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME, 
  password: process.env.DB_PASSWORD,
  password: process.env.DB_NAME, 
  

//database: 'kammouv'  Nom de ta base de données

waitForConnection: true,
connectionList : 10,
queueLimit : 0
});




connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  } 
  else {
    console.log('Connecté à la base de données MySQL');
    return;
  }
});


/*connection.query('SELECT * FROM Bus', (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      return;
    }
    console.log('Résultat de la requète :', rows);
});*/

module.exports = connection;