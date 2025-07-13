process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const express = require('express');
const app = express();
const conversationRoutes = require('./routes/conversations');

// Middleware pour parser le JSON
app.use(express.json());

// Route test (racine)
app.get('/', (req, res) => {
  res.send('API Dialogo fonctionne !');
});

// Routes des conversations
app.use('/conversations', conversationRoutes);
// Gestion des erreurs non capturées → renvoyer un JSON au lieu de HTML
app.use((err, req, res, next) => {
  console.error('Erreur capturée par le middleware global :', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Erreur interne du serveur'
  });
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log('✅ Dialogo API running at http://localhost:3000');
});
