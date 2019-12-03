const router = require('express').Router();
const mysql = require('mysql')

//connect mysql db
const pool = mysql.createPool({
    connectionLimit: 500,
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'b1fadc3c9ec71c',
    password: 'c4325777',
    database: 'heroku_dd0c314e35a5b93'
});
function get_allsubjects(req,res) {
    // connection will be acquired automatically
    pool.query('SELECT * FROM subjects', function(err, result) {
    if (err) {
        res.send(err);
    }
        res.send(result);
    });
}
    

router.get('/', function(req, res) {
    get_allsubjects(req, res);
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