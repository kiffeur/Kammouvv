const connection = require('../databaseConnection');

// Récupérer toutes les réservations
function getAllReservations(req, res) {
  connection.query('SELECT * FROM reservations', (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(rows);
  });
}

// Récupérer une réservation par son ID
function getReservationById(req, res) {
  const reservationId = req.params.id;
  connection.query('SELECT * FROM reservations WHERE id = ?', [reservationId], (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    if (rows.length === 0) {
      res.status  (404).send('Réservation non trouvée');
    } else {
      res.json(rows[0]);
    }
  });
}

// Créer une nouvelle réservation
function createReservation(req, res) {
  const { ticket_id, utilisateur_id } = req.body;
  connection.query('INSERT INTO reservations (ticket_id, utilisateur_id) VALUES (?, ?)', [ticket_id, utilisateur_id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.status(201).json({ id: result.insertId });
  });
}

// Mettre à jour une réservation
function updateReservation(req, res) {
  const reservationId = req.params.id;
  const { ticket_id, utilisateur_id } = req.body;
  connection.query('UPDATE reservations SET ticket_id = ?, utilisateur_id = ? WHERE id = ?', [ticket_id, utilisateur_id, reservationId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json({ message: 'Réservation mise à jour avec succès' });
  });
}

// Supprimer une réservation
function deleteReservation(req, res) {
  const reservationId = req.params.id;
  connection.query('DELETE FROM reservations WHERE id = ?', [reservationId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json({ message: 'Réservation supprimée avec succès' });
  });
}

module.exports = {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation
};
