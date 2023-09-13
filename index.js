const express = require('express');
const app = express();
const port = process.env.p||3000;

const busRoutes = require('./routes/busRoutes'); // Importe les routes
const agenceRoutes = require('./routes/agenceRoutes'); // Importe les routes
const historiqTicketsRoutes = require('./routes/historiqTicketsRoutes'); // Importe les routes
const imageRoutes = require('./routes/imageRoutes'); // Importe les routes
const notificationsRoutes = require('./routes/notificationsRoutes'); // Importe les routes
const paiementsRoutes = require('./routes/paiementsRoutes'); // Importe les routes
const reservationRoutes = require('./routes/reservationRoutes'); // Importe les routes
const ticketRoutes = require('./routes/ticketRoutes'); // Importe les routes
const utilisateurRoutes = require('./routes/utilisateurRoutes'); // Importe les routes
const transactionRoutes = require('./routes/transactionRoutes'); // Importe les routes
const connection = require('./databaseConnection');

app.use('/api', busRoutes , agenceRoutes , historiqTicketsRoutes, imageRoutes,
notificationsRoutes ,paiementsRoutes ,reservationRoutes, ticketRoutes , 
utilisateurRoutes, transactionRoutes); 

/*app.use('/api', historiqTicketsRoutes);
app.use('/api', busRoutes);
app.use('/api', busRoutes);
app.use('/api', busRoutes);
app.use('/api', busRoutes);
app.use('/api', busRoutes);
app.use('/api', busRoutes);
app.use('/api', busRoutes);
*/

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});



module.exports = connection
