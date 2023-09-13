const express = require('express');
const router = express.Router();
const connection = require('../databaseConnection');
const notificationController = require('../controlleur/notificationController');

// Route pour récupérer toutes les notifications
router.get('/notifications', (req, res) => {
  connection.query('SELECT * FROM notifications', (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(rows);
  });
});

// Route pour récupérer une notification par son ID
router.get('/notifications/:id', (req, res) => {
  const notificationId = req.params.id;
  connection.query('SELECT * FROM notifications WHERE id = ?', [notificationId], (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    if (rows.length === 0) {
      res.status(404).send('Notification non trouvée');
    } else {
      res.json(rows[0]);
    }
  });
});

// Route pour récupérer toutes les notifications
router.get('/notifications', notificationController.getAllNotifications);

// Route pour récupérer une notification par son ID
router.get('/notifications/:id', notificationController.getNotificationById);

// Route pour créer une nouvelle notification
router.post('/notifications', notificationController.createNotification);

// Route pour mettre à jour une notification
router.put('/notifications/:id', notificationController.updateNotification);

// Route pour supprimer une notification
router.delete('/notifications/:id', notificationController.deleteNotification);

// Autres routes pour créer, mettre à jour et supprimer des notifications si nécessaire

module.exports = router;
