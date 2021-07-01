module.exports = (app, serviceComposition, jwt) => {

    app.get('/composition', async (req, res) => {
        return res.json(await serviceComposition.dao.getAll())
    })

    app.get('/composition/:id_piece_cree', async (req, res) => {
        return res.json(await serviceComposition.getCompositionByIdPieceCree(req.params.id_piece_cree))
    })

    app.post('/composition/add', async (req, res) => {
        try{
            serviceComposition.insert(req.body.id_piece_cree, req.body.id_piece_composition, req.body.quantite)
            res.status(200).end()
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
        
    })

    app.delete('/composition/delete/:id_composition', async (req, res) => {
        try{
            serviceComposition.delete(req.params.id_composition)
            res.status(200).end()
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })
    
}