module.exports = (app, serviceGammeOperation, jwt) => {

    app.get('/gamme_operation', async (req, res) => {
        return res.json(await serviceGammeOperation.dao.getAll())
    })

    app.get('/gamme_operation/:id_gamme', async (req, res) => {
        return res.json(await serviceGammeOperation.getGammeOperationByIdGamme(req.params.id_gamme))
    })

    app.post('/gamme_operation/add', async (req, res) => {
        try{
            serviceGammeOperation.insert(req.body.id_gamme, req.body.id_operation)
            res.status(200).end()
        }catch(error){
            console.log(error)
            res.status(500).end()
        }
    })
    
}