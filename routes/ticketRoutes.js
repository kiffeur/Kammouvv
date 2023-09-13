const express = require('express');
const router = express.Router();
const connection = require('../databaseConnection');
const ticketController = require('../controlleur/ticketController');

// Route pour récupérer tous les tickets
router.get('/tickets', (req, res) => {
  connection.query('SELECT * FROM tickets', (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(rows);
  });
});

// Route pour récupérer un ticket par son ID
router.get('/tickets/:id', (req, res) => {
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
});

// Route pour récupérer tous les tickets
router.get('/tickets', ticketController.getAllTickets);

// Route pour récupérer un ticket par son ID
router.get('/tickets/:id', ticketController.getTicketById);

// Route pour créer un nouveau ticket
router.post('/tickets', ticketController.createTicket);

// Route pour mettre à jour un ticket
router.put('/tickets/:id', ticketController.updateTicket);

// Route pour supprimer un ticket
router.delete('/tickets/:id', ticketController.deleteTicket);



module.exports = router;
