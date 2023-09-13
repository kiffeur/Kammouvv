const express = require('express');
const router = express.Router();
const connection = require('../databaseConnection');
const historiqueTicketsController = require('../controlleur/historiqueticketController');


// Route pour récupérer l'historique des tickets d'un utilisateur
router.get('/historique/:utilisateurId', (req, res) => {
  const utilisateurId = req.params.utilisateurId;
  connection.query('SELECT * FROM historiqueTickets WHERE id_utilisateur = ?', [utilisateurId], (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(rows);
  });
});

// Route pour récupérer tous les historiques de tickets
router.get('/historiqueTickets', historiqueTicketsController.getAllHistoriqueTickets);

// Route pour récupérer un historique de ticket par son ID
router.get('/historiqueTickets/:id', historiqueTicketsController.getHistoriqueTicketById);

// Route pour créer un nouvel historique de ticket
router.post('/historiqueTickets', historiqueTicketsController.createHistoriqueTicket);

// Route pour mettre à jour un historique de ticket
router.put('/historiqueTickets/:id', historiqueTicketsController.updateHistoriqueTicket);

// Route pour supprimer un historique de ticket
router.delete('/historiqueTickets/:id', historiqueTicketsController.deleteHistoriqueTicket);




// Route pour permettre à un utilisateur de gérer une réservation (ajouter, mettre à jour, supprimer)


module.exports = router;
