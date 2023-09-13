const connection = require('../databaseConnection');

function getAllAgences(req, res) {
  connection.query('SELECT * FROM agences', (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(rows);
  });
}

function getAgenceById(req, res) {
  const agenceId = req.params.id;
  connection.query('SELECT * FROM agences WHERE id = ?', [agenceId], (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    if (rows.length === 0) {
      res.status(404).send('Agence non trouvée');
    } else {
      res.json(rows[0]);
    }
  });
}

function createAgence(req, res) {
  const { nom, ville, pays } = req.body;
  connection.query('INSERT INTO agences (nom, ville, pays) VALUES (?, ?, ?)', [nom, ville, pays], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.status(201).json({ id: result.insertId });
  });
}

function updateAgence(req, res) {
  const agenceId = req.params.id;
  const { nom, ville, pays } = req.body;
  connection.query('UPDATE agences SET nom = ?, adresse = ?, telephone = ? WHERE id = ?', [nom, ville, pays, agenceId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json({ message: 'Agence mise à jour avec succès' });
  });
}

function deleteAgence(req, res) {
  const agenceId = req.params.id;
  connection.query('DELETE FROM agences WHERE id = ?', [agenceId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json({ message: 'Agence supprimée avec succès' });
  });
}

module.exports = {
  getAllAgences,
  getAgenceById,
  createAgence,
  updateAgence,
  deleteAgence
};
