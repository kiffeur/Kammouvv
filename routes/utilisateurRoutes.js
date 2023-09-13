const express = require('express');
const router = express.Router();
const connection = require('../databaseConnection');
const userController = require('../controlleur/userController');

// Route pour récupérer tous les utilisateurs
router.get('/users', (req, res) => {
  connection.query('SELECT * FROM utilisateurs', (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(rows);
  });
});

// Route pour récupérer un utilisateur par son ID
router.get('/users/:id', (req, res) => {
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
});

// Route pour récupérer tous les utilisateurs
router.get('/users', userController.getAllUsers);

// Route pour récupérer un utilisateur par son ID
router.get('/users/:id', userController.getUserById);

// Route pour créer un nouvel utilisateur
router.post('/users', userController.createUser);

// Route pour mettre à jour un utilisateur
router.put('/users/:id', userController.updateUser);

// Route pour supprimer un utilisateur
router.delete('/users/:id', userController.deleteUser);




module.exports = router;
