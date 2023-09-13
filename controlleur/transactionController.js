const connection = require('../databaseConnection');

// Récupérer toutes les transactions
function getAllTransactions(req, res) {
  connection.query('SELECT * FROM transactions', (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(rows);
  });
}

// Récupérer une transaction par son ID
function getTransactionById(req, res) {
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
}

// Créer une nouvelle transaction
function createTransaction(req, res) {
  const { montant, type_transaction, utilisateur_id } = req.body;
  connection.query('INSERT INTO transactions (montant, type_transaction, utilisateur_id) VALUES (?, ?, ?)', [montant, type_transaction, utilisateur_id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.status(201).json({ id: result.insertId });
  });
}

// Mettre à jour une transaction
function updateTransaction(req, res) {
  const transactionId = req.params.id;
  const { montant, type_transaction, utilisateur_id } = req.body;
  connection.query('UPDATE transactions SET montant = ?, type_transaction = ?, utilisateur_id = ? WHERE id = ?', [montant, type_transaction, utilisateur_id, transactionId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json({ message: 'Transaction mise à jour avec succès' });
  });
}

// Supprimer une transaction
function deleteTransaction(req, res) {
  const transactionId = req.params.id;
  connection.query('DELETE FROM transactions WHERE id = ?', [transactionId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json({ message: 'Transaction supprimée avec succès' });
  });
}

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction
};
