const connection = require('../databaseConnection');

// Récupérer toutes les notifications
function getAllNotifications(req, res) {
  connection.query('SELECT * FROM notifications', (err, rows) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(rows);
  });
}

// Récupérer une notification par son ID
function getNotificationById(req, res) {
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
}

// Créer une nouvelle notification
function createNotification(req, res) {
  const { utilisateur_id, message, date_envoi } = req.body;
  connection.query('INSERT INTO notifications (utilisateur_id, message, date_envoi) VALUES (?, ?, ?)', [utilisateur_id, message, date_envoi], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.status(201).json({ id: result.insertId });
  });
}

// Mettre à jour une notification
function updateNotification(req, res) {
  const notificationId = req.params.id;
  const { utilisateur_id, message, date_envoi } = req.body;
  connection.query('UPDATE notifications SET utilisateur_id = ?, message = ?, date_envoi = ? WHERE id = ?', [utilisateur_id, message, date_envoi, notificationId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json({ message: 'Notification mise à jour avec succès' });
  });
}

// Supprimer une notification
function deleteNotification(req, res) {
  const notificationId = req.params.id;
  connection.query('DELETE FROM notifications WHERE id = ?', [notificationId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json({ message: 'Notification supprimée avec succès' });
  });
}

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification
};
