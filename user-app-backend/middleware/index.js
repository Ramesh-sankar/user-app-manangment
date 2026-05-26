const jwt = require('jsonwebtoken')
exports.generateToken = (data) => {
    try {
        return jwt.sign({ id: data._id, name: data.name, email: data.email }, process.env.JWTTOEKNSECRET, { expiresIn: '10m' })
    } catch (e) {
        console.log('e', e)
    }
}
exports.verifyToken = async (req, res, next) => {
    try {
        let { headers: { authorization } } = req, token = authorization.split(' ')[1];
        jwt.verify(token, process.env.JWTTOEKNSECRET, function (err, decoded) {
            if (err) { res.sendStatus(403); }
            req.user = decoded;
            next()
        });
    } catch (e) {
        console.log('token error', e)
    }
}