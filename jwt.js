const jwt = require('jsonwebtoken')
const jwtKey = 'PS2A'
const jwtExpirySeconds = 3600

module.exports = (userService, droitsService, userdroitsService) => {
    return {
        validateJWT(req, res, next) {
            if (req.headers.authorization === undefined) {
                res.status(401).end()
                return
            }
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, jwtKey, {algorithm: "HS256"},  async (err, user) => {
                if (err) {
                    res.status(401).end()
                    return
                }
                console.log(user)
                try {
                    req.user = await userService.dao.getByEmail(user.email)
                    return next()
                } catch(e) {
                    console.log(e)
                    res.status(401).end()
                }

            })
        },
        generateJWT(login) {
            return jwt.sign({login}, jwtKey, {
                algorithm: 'HS256',
                expiresIn: jwtExpirySeconds
            })
        },
        getKey() {
            return jwtKey
        }
    }
}