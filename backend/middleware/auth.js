const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    //authHeader has two parts Bearer Token so splitting the token part
    //and before that checking if authHeader has something
    const token = authHeader && authHeader.split(' ')[1];

    //if token is undefined
    if(!token) {
        return res.status(401).json({
            success:false,
            message:'access token required'
        });
    }

    //if token not NULL
    //it has a callback too that has err and the thing we serialized
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
        if(err) {
            return res.status(401).json({
                success:false,
                message: 'Invalid or expired token'
            });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;