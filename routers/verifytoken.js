const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    
    const token = req.header('authen-token');
    if (!token) return res.status(401).send('Access Denied');
    
    try {
        const verified = jwt.verify(token, '9xGl54Tn');
        req.user = verified;
        next();
    }
    catch (e){
        res.status(400).send('Invalid Token');
    }

}