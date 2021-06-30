module.exports = (app, serviceOperation, jwt) => {

    app.get('/operation', async (req, res) => {
        return res.json(await serviceOperation.dao.getAll())
    })

    app.post('/operation/add', async (req, res) => {
        try{
            res.json(await serviceOperation.insert(req.body.label, req.body.id_poste_machine, req.body.temps_travail))
        }catch(error){
            console.log(error)
            res.status(500).end()
        }
    })
    
}