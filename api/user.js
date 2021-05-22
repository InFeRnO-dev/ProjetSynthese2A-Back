const jwtreq = require('jsonwebtoken')
module.exports = (app, serviceUser, jwt) => {

    app.get('/user', async (req, res) => {
        try{
            const users = await serviceUser.dao.getAll()
            console.log(res)
            console.log(users)
            return res.json(users)
        }catch(e){
            console.log(e)
        }
        
    })

    app.get('/user/:email', async (req, res) => {
        try{
            const user = await serviceUser.dao.getByEmail(email)
            console.log(res)
            console.log(user)
            return res.json(user)
        }catch(e){
            console.log(e)
        }
        
    })

    app.post('/user/authenticate', async (req, res) => {
        const email = req.body.email
        const password = req.body.password
        if ((email === undefined) || (password === undefined)) {
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

    app.post('/user', async (req, res) => {
        try{
            const user = await serviceUser.dao.getByEmail(req.body.email)
            console.log(user)
            return res.json(user)
        }catch(e){
            console.log(e)
        }
        
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