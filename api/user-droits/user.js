const jwtreq = require('jsonwebtoken')
module.exports = (app, serviceUser, jwt) => {

    app.get('/user', async (req, res) => {
        try{
            console.log(await serviceUser.dao.getAll())
            return res.json(await serviceUser.dao.getAll())
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

    app.post('/user/add', (req, res) => {
        try{
            const email = req.body.email
            const password = req.body.password
            serviceUser.inserthash(email, password)
            res.status(200).end()
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })
    app.put('/user/edit/:id', (req, res) => {
        try{
            const id = req.params.id
            const email = req.body.email
            const password = req.body.password
            console.log(id, email, password)
            serviceUser.update(id, email, password)
            .then(res.status(200).end())
            
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

    app.delete('/user/delete/:id', (req, res) => {
        try{
            const id = req.params.id
            serviceUser.delete(id)
            .then(res.status(200).end())

        }catch(e){
            res.status(500).end()
            console.log(e)
        }
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

    app.post('/user/authenticate', async (req, res) => {
        const email = req.body.email
        const password = req.body.password
        if ((email === undefined) || (password === undefined)) {
            res.status(400).end()
            return
        }
        serviceUser.validatePassword(email, password)
            .then(async autheticated => {
                if (!autheticated) {
                    res.status(401).end()
                    return
                }
                const temp = await serviceUser.dao.getByEmail(email)
                const droits = await serviceUser.dao.getDroits(temp)
                let tabdroits = []
                console.log(droits)
                if(droits[0].id_droits === null || droits[0].id_droits === undefined) {
                    console.log("sauce")
                    droits.id_droits = []
                }else {
                    droits.forEach((user, index) => {
                        tabdroits[index] = user.id_droits
                    });
                }
                const user = {}
                user.id_user = temp.id_user
                user.email = temp.email
                user.droits = tabdroits
                console.log('user = ' , user)
                res.json({'token': jwt.generateJWT(user)})
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