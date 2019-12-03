const router = require('express').Router();
const mysql = require('mysql')

//connect mysql db
const dbconnection = mysql.createPool({
    connectionLimit: 100,
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'b1fadc3c9ec71c',
    password: 'c4325777',
    database: 'heroku_dd0c314e35a5b93'
});

// Attempt to catch disconnects 
dbconnection.on('connection', function (connection) {
    console.log('connected to Mysql');
  
    connection.on('error', function (err) {
      console.error(new Date(), 'MySQL error', err.code);
    });
    connection.on('close', function (err) {
      console.error(new Date(), 'MySQL close', err);
    });
  
});
    

router.get('/', (req, res) => {
    dbconnection.query('SELECT * FROM subjects', (err, result, field) => {
        if (!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    })
})

router.get('/category', (req, res) => {
    dbconnection.query('SELECT category FROM subjects', (err, result, field) => {
        if (!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    })
})


module.exports = router;