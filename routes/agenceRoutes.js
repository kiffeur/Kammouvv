const express = require('express');
const router = express.Router();
const connection = require('../databaseConnection');
const agenceController = require('../controlleur/agenceController');

// Route pour récupérer toutes les agences
router.get('/agences', (req, res) => {
  connection.query('SELECT * FROM agences', (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(rows);
  });
});

// Route pour récupérer une agence par son ID
router.get('/agences/:id', (req, res) => {
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
});

// Route pour récupérer toutes les agences
router.get('/agences', agenceController.getAllAgences);

// Route pour récupérer une agence par son ID
router.get('/agences/:id', agenceController.getAgenceById);

// Route pour créer une nouvelle agence
router.post('/agences', agenceController.createAgence);

// Route pour mettre à jour une agence
router.put('/agences/:id', agenceController.updateAgence);

// Route pour supprimer une agence
router.delete('/agences/:id', agenceController.deleteAgence);



module.exports = router;
