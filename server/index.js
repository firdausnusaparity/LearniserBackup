/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const middlewares = require('./routes/middlewares');


//connect mongodb
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(
  'mongodb+srv://admin:admin@cluster0-9fhit.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to mongo database'));


//middlewares

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(middlewares.checkTokenSetUser)

//import routes
const authRoute = require('./routes/auth');
const admin = require('./routes/admin');
const subjects = require('./subjects/subjects');

//Route middlewares
app.use('/users', authRoute);
app.use('/adminusers', middlewares.isLoggedIn, middlewares.isAdmin, admin);
app.use('/subjects', subjects);

//Handle production
if(process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle Single Page Application
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/indec.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log('server running on port ' + port);
})


 