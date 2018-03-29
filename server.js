const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');
const authRouter = require(__dirname + '/routes/authRouter');
const characterRouter = require(__dirname + '/routes/characterRouter');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dandb', {
  useMongoClient: true
});


app.use('/api', authRouter);
app.use('/api', characterRouter);
app.use('/test', (req, res) =>{
  res.status(200).send('hi there');
})
app.use(express.static(__dirname + '/build'));


app.use((req, res) => {
  res.status(404).send('Page not found!');
})

module.exports = app.listen(PORT, () => console.log('server up on port: ' + PORT))
