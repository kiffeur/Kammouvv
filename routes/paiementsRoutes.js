const express = require('express');
const router = express.Router();
const connection = require('../databaseConnection');
const paiementController = require('../controlleur/paiementController');

// Route pour récupérer tous les paiements
router.get('/paiements', (req, res) => {
  connection.query('SELECT * FROM paiements', (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(rows);
  });
});

// Route pour récupérer un paiement par son ID
router.get('/paiements/:id', (req, res) => {
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
});


// Route pour récupérer tous les paiements
router.get('/paiements', paiementController.getAllPaiements);

// Route pour récupérer un paiement par son ID
router.get('/paiements/:id', paiementController.getPaiementById);

// Route pour créer un nouveau paiement
router.post('/paiements', paiementController.createPaiement);

// Route pour mettre à jour un paiement
router.put('/paiements/:id', paiementController.updatePaiement);

// Route pour supprimer un paiement
router.delete('/paiements/:id', paiementController.deletePaiement);

module.exports = router;
