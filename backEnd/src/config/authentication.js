const jwt = require('jsonwebtoken');


let verifyToken = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];
    let parts = token.split('.');
    if (parts.length !== 3) {
        return res.status(401).send('Unauthorized request');
    }
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, 'SecretIsKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
}


module.exports = verifyToken;
