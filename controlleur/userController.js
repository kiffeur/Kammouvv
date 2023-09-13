const connection = require('../databaseConnection');

function getAllUsers(req, res) {
  connection.query('SELECT * FROM utilisateurs', (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(rows);
  });
}

function getUserById(req, res) {
  const userId = req.params.id;
  connection.query('SELECT * FROM utilisateurs WHERE id = ?', [userId], (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    if (rows.length === 0) {
      res.status(404).send('Utilisateur non trouvé');
    } else {
      res.json(rows[0]);
    }
  });
}

function createUser(req, res) {
  const { nom, prenom, email, mot_de_passe } = req.body;
  connection.query('INSERT INTO utilisateurs (prenom, nom, email, mot_de_passe) VALUES (?, ?, ?, ?)', [prenom, nom, email, mot_de_passe], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.status(201).json({ id: result.insertId });
  });
}

function updateUser(req, res) {
  const userId = req.params.id;
  const { nom, prenom, email, mot_de_passe } = req.body;
  connection.query('UPDATE utilisateurs SET prenom = ?, nom = ?, email = ?, mot_de_passe = ? WHERE id = ?', [prenom,nom, email, mot_de_passe, userId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json({ message: 'Utilisateur mis à jour avec succès' });
  });
}

function deleteUser(req, res) {
  const userId = req.params.id;
  connection.query('DELETE FROM utilisateurs WHERE id = ?', [userId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json({ message: 'Utilisateur supprimé avec succès' });
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
