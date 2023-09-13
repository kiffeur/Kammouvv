const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Utilisateur MySQL
  password: '', // Mot de passe MySQL
  database: 'kammouv' // Nom de ta base de données
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