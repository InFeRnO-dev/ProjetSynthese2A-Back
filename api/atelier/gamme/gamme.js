module.exports = (app, serviceGamme, jwt) => {

    app.get('/gamme', async (req, res) => {
        return res.json(await serviceGamme.dao.getAll())
    })

    app.get('/gamme/:id', async (req, res) => {
        const id_piece = req.params.id
        return res.json(await serviceGamme.dao.getByIdPiece(id_piece))
    })

    app.post('/gamme/add', async (req, res) => {
        try{
            serviceGamme.insert(req.body.label, req.body.id_user, req.body.id_piece)
            res.status(200).end()
        }catch(error){
            console.log(error)
            res.status(500).end()
        }
    })
    
}