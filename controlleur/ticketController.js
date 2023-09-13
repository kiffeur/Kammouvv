const connection = require('../databaseConnection');

// Récupérer tous les tickets
function getAllTickets(req, res) {
  connection.query('SELECT * FROM tickets', (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(rows);
  });
}

// Récupérer un ticket par son ID
function getTicketById(req, res) {
  const ticketId = req.params.id;
  connection.query('SELECT * FROM tickets WHERE id = ?', [ticketId], (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    if (rows.length === 0) {
      res.status(404).send('Ticket non trouvé');
    } else {
      res.json(rows[0]);
    }
  });
}

// Créer un nouveau ticket
function createTicket(req, res) {
  const { matricule, prix, agence_id, bus_id, place_disponible } = req.body;
  connection.query('INSERT INTO tickets (matricule, prix, agence_id, bus_id, place_disponible) VALUES (?, ?, ?, ?, ?)', [matricule, prix, agence_id, bus_id, place_disponible], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.status(201).json({ id: result.insertId });
  });
}

// Mettre à jour un ticket
function updateTicket(req, res) {
  const ticketId = req.params.id;
  const { matricule, prix, agence_id, bus_id, place_disponible } = req.body;
  connection.query('UPDATE tickets SET matricule = ?, prix = ?, agence_id = ?, bus_id = ?, place_disponible = ? WHERE id = ?', [matricule, prix, agence_id, bus_id, place_disponible, ticketId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json({ message: 'Ticket mis à jour avec succès' });
  });
}

// Supprimer un ticket
function deleteTicket(req, res) {
  const ticketId = req.params.id;
  connection.query('DELETE FROM tickets WHERE id = ?', [ticketId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json({ message: 'Ticket supprimé avec succès' });
  });
}

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket
};
