const express = require('express');
const router = express.Router();
const connection = require('../databaseConnection');

// Route pour récupérer toutes les images
router.get('/images', (req, res) => {
  connection.query('SELECT * FROM images', (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(rows);
  });
});

// Route pour récupérer une image par son ID
router.get('/images/:id', (req, res) => {
  const imageId = req.params.id;
  connection.query('SELECT * FROM images WHERE id = ?', [imageId], (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    if (rows.length === 0) {
      res.status(404).send('Image non trouvée');
    } else {
      res.json(rows[0]);
    }
  });
});



module.exports = router;
