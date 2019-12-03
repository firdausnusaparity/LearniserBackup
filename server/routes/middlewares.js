const jwt = require('jsonwebtoken');

function checkTokenSetUser(req, res, next) {
    const authHeader = req.get('authorization');
    if (authHeader) {
        const token = authHeader
        if (token) {
            jwt.verify(token, 'pidonusa', (error, user) => {
                if (error) {
                    console.log(error);
                }
                req.user = user;
                next();
            })
        } else {
        next();
        }
    } else {
    next();
    }
}

function isLoggedIn (req, res, next) {
    if(req.user) {
        next();
    } else {
        const error = new Error('unauthorized(not-logged in)');
        res.status(401);
        next(error);
    }
}

function isAdmin(req, res, next) {
    if (req.user.role === 'admin') {
      next();
    } else {
        const error = new Error('unauthorized(not-logged in as admin)');
        res.status(401);
        next(error);
    }
  }

module.exports = {
    checkTokenSetUser, 
    isLoggedIn,
    isAdmin
};