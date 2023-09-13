const express = require('express');
const router = express.Router();
const connection = require('../databaseConnection'); 
const req = require('express/lib/request');
const busController = require('../controlleur/busController');




// Route pour récupérer tous les bus
router.get('/buses', (req, res) => {
  connection.query('SELECT * FROM bus', (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(rows);
  });
});

// Route pour récupérer un bus par son ID
router.get('/buses/:id', (req, res) => {
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
});

// Route pour récupérer tous les bus
router.get('/bus', busController.getAllBus);

// Route pour récupérer un bus par son ID
router.get('/bus/:id', busController.getBusById);

// Route pour créer un nouveau bus
router.post('/bus', busController.createBus);

// Route pour mettre à jour un bus
router.put('/bus/:id', busController.updateBus);

// Route pour supprimer un bus
router.delete('/bus/:id', busController.deleteBus);

module.exports = router;
