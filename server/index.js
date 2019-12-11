/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const middlewares = require('./routes/middlewares');


//connect mongodb
mongoose.connect(
  'mongodb://admin:admin@cluster0-shard-00-00-9fhit.mongodb.net:27017,cluster0-shard-00-01-9fhit.mongodb.net:27017,cluster0-shard-00-02-9fhit.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true, }
)
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to Mongo database'));


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
app.use('/subjects', middlewares.isLoggedIn, subjects);

//Handle production
if(process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle Single Page Application
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log('server running on port ' + port);
})


 