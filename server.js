const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');
// const authRouter = require(__dirname + '/routes/authRouter');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/db', {
  useMongoClient: true
});

// app.use('/api', authRouter);
app.use('/test', (req, res) =>{
  res.status(200).send('hi there');
})

app.use((req, res) => {
  res.status(404).send('Page not found!');
})

module.exports = app.listen(PORT, () => console.log('server up on port: ' + PORT))