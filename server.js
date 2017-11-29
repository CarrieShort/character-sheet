const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/db', {
  useMongoClient: true
});

app.use((req, res) => {
  res.status(404).send('Page not found!');
})

module.exports = app.listen(PORT, () => console.log('server up on port: ' + PORT))