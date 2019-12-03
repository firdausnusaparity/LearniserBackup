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
function handle_database(req,res) {
   
    pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }  

        console.log('connected to mysql');

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;    
        });
  });
}
    

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