const express = require('express');
const router = express.Router();
const connection = require('../databaseConnection');
const transactionController = require('../controlleur/transactionController');


// Route pour récupérer toutes les transactions
router.get('/transactions', (req, res) => {
  connection.query('SELECT * FROM transactions', (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(rows);
  });
});

// Route pour récupérer une transaction par son ID
router.get('/transactions/:id', (req, res) => {
  const transactionId = req.params.id;
  connection.query('SELECT * FROM transactions WHERE id = ?', [transactionId], (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    if (rows.length === 0) {
      res.status(404).send('Transaction non trouvée');
    } else {
      res.json(rows[0]);
    }
  });
});

// Route pour récupérer toutes les transactions
router.get('/transactions', transactionController.getAllTransactions);

// Route pour récupérer une transaction par son ID
router.get('/transactions/:id', transactionController.getTransactionById);

// Route pour créer une nouvelle transaction
router.post('/transactions', transactionController.createTransaction);

// Route pour mettre à jour une transaction
router.put('/transactions/:id', transactionController.updateTransaction);

// Route pour supprimer une transaction
router.delete('/transactions/:id', transactionController.deleteTransaction);


module.exports = router;
