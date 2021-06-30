module.exports = (app, serviceStock_Piece, jwt) => {

    app.get('/stock_piece', async (req, res) => {
        return res.json(await serviceStock_Piece.dao.getAll())
    })

    app.put('/stock_piece/edit/:id_stock_piece', async (req, res) => {
        try{
            serviceStock_Piece.update(req.params.id_stock_piece, req.body.quantite)
            res.status(200).end()
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
        
    })
    
}