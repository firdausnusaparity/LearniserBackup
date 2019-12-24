const router = require('express').Router();
const mysql = require('mysql');
const middlewares = require('../routes/middlewares');

//connect mysql db
const dbconnection = mysql.createPool({
    connectionLimit: 500,
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'b1fadc3c9ec71c',
    password: 'c4325777',
    database: 'heroku_dd0c314e35a5b93'
});

// Attempt to catch disconnects 
dbconnection.on('connection', function (connection) {
    console.log('connected to Mysql database');
  
    connection.on('error', function (err) {
      console.error(new Date(), 'MySQL error', err.code);
    });
    connection.on('close', function (err) {
      console.error(new Date(), 'MySQL close', err);
    });
  
});
    
//Default section
router.get('/form5', (req, res) => {
    dbconnection.query('SELECT * FROM subjects WHERE form = 5', (err, result, field) => {
        if (!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    })
})

router.get('/form4', (req, res) => {
    dbconnection.query('SELECT * FROM subjects WHERE form = 4', (err, result, field) => {
        if (!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    })
})

router.get('/all', (req, res) => {
    dbconnection.query('SELECT * FROM subjects', (err, result, field) => {
        if (!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    })
})

// User section
router.get('/getUserEnrolled', (req, res) => {
    dbconnection.query('SELECT * FROM enrolled WHERE user_id = ?', [req.user._id], (err, result, field) => {
        if (!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    })
})

router.post('/addenrolled', (req, res) => {
    var sql = "INSERT INTO `enrolled` SET `user_id`=?, `subjects`=?, `chapter_progress`=?, `question_progress`=?, `reference_id`=?" 
    dbconnection.query(sql, [req.user._id, req.body.subjects, 0, 0, req.body.reference_id],(err, result, field) => {
        if (!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    })
})

router.patch('/updateenrolled', (req, res) => {
    var sql = "UPDATE `enrolled` SET `chapter_progress` =?, `question_progress` =?, `reference_id` =? WHERE `user_id` =? && `subjects` =?"
    dbconnection.query(sql, [ req.body.chapter_progress, req.body.question_progress, req.body.reference_id, req.user._id, req.body.subjects], (err, result, field) => {
        if (!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    })
})

router.post('/deleteenrolled', (req, res) => {
    var sql = "DELETE FROM `enrolled` WHERE `user_id` =? && `subjects` =?"
    dbconnection.query(sql, [ req.user._id, req.body.subjects], (err, result, field) => {
        if (!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    })
})

router.post('/currentlearn', (req, res) => {
    var sql = "SELECT * FROM `syllabus` WHERE `subject_name` =? && `chapter_no` =? && `subtopic_no` =?"
    dbconnection.query(sql, [ req.body.subject_name , req.body.chapter_no, req.body.subtopic_no ], (err, result, field) => {
        if (!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    })
})

router.post('/currentquestion', (req, res) => {
    var sql = "SELECT `questions`, `option_1`, `option_2`, `option_3`, `option_4`, `correct_answer` FROM `questions` WHERE `subject_name` =? && `chapter_no` =? && `subtopic_no` =? ORDER BY RAND()"
    dbconnection.query(sql, [ req.body.subject_name , req.body.chapter_no, req.body.subtopic_no ], (err, result, field) => {
        if (!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    })
})

router.post('/nochaptersincurrentlearning', (req, res) => {
    var sql = "SELECT DISTINCT `chapter_no` FROM `syllabus` WHERE `subject_name` =?"
    dbconnection.query(sql, req.body.subject_name, (err, result, field) => {
        if (!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    })
})

router.post('/nosubtopicincurrentlearning', (req, res) => {
    var sql = "SELECT DISTINCT `subtopic_no` FROM `syllabus` WHERE `subject_name` =? && `chapter_no` =?"
    dbconnection.query(sql, [req.body.subject_name, req.body.chapter_no], (err, result, field) => {
        if (!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    })
})

// Admin section
router.post('/currentediting', middlewares.isAdmin, (req, res) => {
    var sql = "SELECT * FROM `syllabus` WHERE `subject_name` =? && `chapter_no` =? && `subtopic_no` =?"
    dbconnection.query(sql, [ req.body.subject_name , req.body.chapter_no, req.body.subtopic_no ], (err, result, field) => {
        if (!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    })
})

router.post('/nochaptersincurrentediting', middlewares.isAdmin, (req, res) => {
    var sql = "SELECT DISTINCT `chapter_no` FROM `syllabus` WHERE `subject_name` =?"
    dbconnection.query(sql, req.body.subject_name, (err, result, field) => {
        if (!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    })
})

router.post('/nosubtopicincurrentediting', middlewares.isAdmin, (req, res) => {
    var sql = "SELECT DISTINCT `subtopic_no` FROM `syllabus` WHERE `subject_name` =? && `chapter_no` =?"
    dbconnection.query(sql, [req.body.subject_name, req.body.chapter_no], (err, result, field) => {
        if (!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    })
})

router.post('/updatesubjectsyllabus', middlewares.isAdmin, (req, res) => {
    var sql = "UPDATE `syllabus` SET `subtopic_title` =?, `content` =?, `image_link` =? WHERE `subject_name` =? && `chapter_no` =? && `subtopic_no` =?"
    dbconnection.query(sql, [ req.body.subtopic_title, req.body.content, req.body.imageURL, req.body.subject_name, req.body.chapter_no, req.body.subtopic_no], (err, result, field) => {
        if (!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    })
})


module.exports = router;