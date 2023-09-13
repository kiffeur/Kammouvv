const connection = require('../databaseConnection');

// Récupérer tous les paiements
function getAllPaiements(req, res) {
  connection.query('SELECT * FROM paiements', (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(rows);
  });
}

// Récupérer un paiement par son ID
function getPaiementById(req, res) {
  const paiementId = req.params.id;
  connection.query('SELECT * FROM paiements WHERE id = ?', [paiementId], (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    if (rows.length === 0) {
      res.status(404).send('Paiement non trouvé');
    } else {
      res.json(rows[0]);
    }
  });
}

// Créer un nouveau paiement
function createPaiement(req, res) {
  const { montant, type_paiement, utilisateur, ticket_id } = req.body;
  connection.query('INSERT INTO paiements (montant, type_paiement, utilisateur, ticket_id) VALUES (?, ?, ?, ?)', [montant, type_paiement, utilisateur, ticket_id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.status(201).json({ id: result.insertId });
  });
}

// Mettre à jour un paiement
function updatePaiement(req, res) {
  const paiementId = req.params.id;
  const { montant, type_paiement, utilisateur, ticket_id } = req.body;
  connection.query('UPDATE paiements SET montant = ?, type_paiement = ?, utilisateur = ?, ticket_id = ? WHERE id = ?', [montant, type_paiement, utilisateur, ticket_id, paiementId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json({ message: 'Paiement mis à jour avec succès' });
  });
}

// Supprimer un paiement
function deletePaiement(req, res) {
  const paiementId = req.params.id;
  connection.query('DELETE FROM paiements WHERE id = ?', [paiementId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json({ message: 'Paiement supprimé avec succès' });
  });
}

module.exports = {
  getAllPaiements,
  getPaiementById,
  createPaiement,
  updatePaiement,
  deletePaiement
};
