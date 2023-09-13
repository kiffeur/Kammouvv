const connection = require('../databaseConnection');

// Récupérer tous les historiques de tickets
function getAllHistoriqueTickets(req, res) {
  connection.query('SELECT * FROM historiqueTickets', (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(rows);
  });
}

// Récupérer un historique de ticket par son ID
function getHistoriqueTicketById(req, res) {
  const historiqueTicketId = req.params.id;
  connection.query('SELECT * FROM historiqueTickets WHERE id = ?', [historiqueTicketId], (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    if (rows.length === 0) {
      res.status(404).send('Historique de ticket non trouvé');
    } else {
      res.json(rows[0]);
    }
  });
}

// Créer un nouvel historique de ticket
function createHistoriqueTicket(req, res) {
  const { utilisateur_id, ticket_id, date_achat } = req.body;
  connection.query('INSERT INTO historiqueTickets (utilisateur_id, ticket_id, date_achat) VALUES (?, ?, ?)', [utilisateur_id, ticket_id, date_achat], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.status(201).json({ id: result.insertId });
  });
}

// Mettre à jour un historique de ticket
function updateHistoriqueTicket(req, res) {
  const historiqueTicketId = req.params.id;
  const { utilisateur_id, ticket_id, date_achat } = req.body;
  connection.query('UPDATE historiqueTickets SET utilisateur_id = ?, ticket_id = ?, date_achat = ? WHERE id = ?', [utilisateur_id, ticket_id, date_achat, historiqueTicketId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json({ message: 'Historique de ticket mis à jour avec succès' });
  });
}

// Supprimer un historique de ticket
function deleteHistoriqueTicket(req, res) {
  const historiqueTicketId = req.params.id;
  connection.query('DELETE FROM historiqueTickets WHERE id = ?', [historiqueTicketId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json({ message: 'Historique de ticket supprimé avec succès' });
  });
}

module.exports = {
  getAllHistoriqueTickets,
  getHistoriqueTicketById,
  createHistoriqueTicket,
  updateHistoriqueTicket,
  deleteHistoriqueTicket
};
