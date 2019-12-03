const router = require('express').Router();
const mysql = require('mysql')

//connect mysql db
const connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'b1fadc3c9ec71c',
    password: 'c4325777',
    database: 'heroku_dd0c314e35a5b93'
});
connection.connect(function(err) {
    if (err) throw err;
    console.log('connected to mysql database')
})
    

router.get('/', (req, res) => {
    connection.query('SELECT * FROM subjects', (err, result, field) => {
        connection.end()
        if (!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    })
})

router.get('/category', (req, res) => {
    connection.query('SELECT category FROM subjects', (err, result, field) => {
        connection.end()
        if (!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    })
})


module.exports = router;