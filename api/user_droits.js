module.exports = (app, serviceUserdroits, jwt) => {

    app.get('/user_droits', async (req, res) => {
        return res.json(await serviceUserdroits.dao.getAll())
    })

    app.post('/user_droits/add', (req, res) => {
        try{
            const id_droits = req.body.id_droits
            const id_user = req.body.id_user
            serviceUserdroits.insert(id_droits,id_user)
            res.status(200).end()
        }catch(e){
            console.log(e)
            res.status(500).end()
        }

    })

    app.delete('/user_droits/:id_droits/:id_user', (req, res) => {
        try{
            const id_droits = req.params.id_droits
            const id_user = req.params.id_user
            serviceUserdroits.delete(id_droits, id_user)
            res.status(200).end()
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })
}