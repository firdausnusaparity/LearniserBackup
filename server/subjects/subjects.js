const router = require('express').Router();
const mysql = require('mysql')

//connect mysql db
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'firdaus246',
    database: 'studyapp_db'
});
connection.connect(function(err) {
    if (err) throw err;
    console.log('connected to mysql database')
})
    

router.get('/', (req, res) => {
    connection.query('SELECT * FROM subjects', (err, result, field) => {
        if (!err)
        res.send(result);
        else
        res.send(err);
    })
})

router.get('/category', (req, res) => {
    connection.query('SELECT category FROM subjects', (err, result, field) => {
        if (!err)
        res.send(result);
        else
        res.send(err);
    })
})

module.exports = router;