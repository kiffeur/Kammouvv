const express = require('express');
const router = express.Router();
const connection = require('../databaseConnection');
const reservationController = require('../controlleur/reservationController');


// Route pour récupérer toutes les réservations
router.get('/reservations', (req, res) => {
  connection.query('SELECT * FROM reservations', (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(rows);
  });
});

// Route pour récupérer une réservation par son ID
router.get('/reservations/:id', (req, res) => {
  const reservationId = req.params.id;
  connection.query('SELECT * FROM reservations WHERE id = ?', [reservationId], (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    if (rows.length === 0) {
      res.status(404).send('Réservation non trouvée');
    } else {
      res.json(rows[0]);
    }
  });
});

//Route pour récupérer toutes les réservations
router.get('/reservations', reservationController.getAllReservations);

// Route pour récupérer une réservation par son ID
router.get('/reservations/:id', reservationController.getReservationById);

// Route pour créer une nouvelle réservation
router.post('/reservations', reservationController.createReservation);

// Route pour mettre à jour une réservation
router.put('/reservations/:id', reservationController.updateReservation);

// Route pour supprimer une réservation
router.delete('/reservations/:id', reservationController.deleteReservation);

module.exports = router;
