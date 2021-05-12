const jwtreq = require('jsonwebtoken')
module.exports = (app, serviceUser, jwt) => {

    app.get('/user', async (res) => {
        await res.json(await serviceUser.dao.getAll())
    })

    app.post('/user/authenticate', (req, res) => {
        const {email, password} = req.body
        this.email = email
        if ((email === undefined) || (password === undefined)) {
            console.log(req.body)
            res.status(400).end()
            return
        }
        serviceUser.validatePassword(email, password)
            .then(autheticated => {
                if (!autheticated) {
                    res.status(401).end()
                    return
                }
                res.json({'token': jwt.generateJWT(email)})
            })
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    app.post('/user/timeout', (req,res) => {
        let oldtoken = req.body.token
        jwtreq.verify(oldtoken, jwt.getKey(), {algorithm: "HS256"}, (err) => {
            if(err) {
                if(err.name === 'TokenExpiredError') {
                    return res.status(401).end()
                }
            }
        })
        try {
            res.json({'token': jwt.generateJWT(this.email)})
        } catch (e) {
            console.log(e)
        }

    })
}