module.exports = (app, serviceRealisationOperation, jwt) => {

    app.get('/realisation_operation', async (req, res) => {
        return res.json(await serviceRealisationOperation.dao.getAll())
    })

    app.get('/realisation_operation/:id_realisation', async (req, res) => {
        return res.json(await serviceRealisationOperation.getRealisationOperationByIdRealisation(req.params.id_realisation))
    })

    app.post('/realisation_operation/add', async (req, res) => {
        try{
            await serviceRealisationOperation.insert(req.body.id_realisation ,req.body.id_operation)
            res.status(200).end()
        }catch(error){
            console.log(error)
            res.status(500).end()
        }
    })
    
}