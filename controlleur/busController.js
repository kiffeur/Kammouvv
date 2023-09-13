const connection = require('../databaseConnection');

// Récupérer tous les bus
function getAllBus(req, res) {
  connection.query('SELECT * FROM bus', (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(rows);
  });
}

// Récupérer un bus par son ID
function getBusById(req, res) {
  const busId = req.params.id;
  connection.query('SELECT * FROM bus WHERE id = ?', [busId], (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    if (rows.length === 0) {
      res.status(404).send('Bus non trouvé');
    } else {
      res.json(rows[0]);
    }
  });
}

// Créer un nouveau bus
function createBus(req, res) {
  const { numero, modele, capacite, agence_id, heure_depart, heure_arrivee } = req.body;
  connection.query('INSERT INTO bus (numero, modele, capacite, agence_id, heure_depart, heure_arrivee) VALUES (?, ?, ?, ?, ?, ?)', [numero, modele, capacite, agence_id, heure_depart, heure_arrivee], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.status(201).json({ id: result.insertId });
  });
}

// Mettre à jour un bus
function updateBus(req, res) {
  const busId = req.params.id;
  const { numero, modele, capacite, agence_id, heure_depart, heure_arrivee } = req.body;
  connection.query('UPDATE bus SET numero = ?, modele = ?, capacite = ?, agence_id = ?, heure_depart = ?, heure_arrivee = ? WHERE id = ?', [numero, modele, capacite, agence_id, heure_depart, heure_arrivee, busId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json({ message: 'Bus mis à jour avec succès' });
  });
}

// Supprimer un bus
function deleteBus(req, res) {
  const busId = req.params.id;
  connection.query('DELETE FROM bus WHERE id = ?', [busId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json({ message: 'Bus supprimé avec succès' });
  });
}

module.exports = {
  getAllBus,
  getBusById,
  createBus,
  updateBus,
  deleteBus
};
