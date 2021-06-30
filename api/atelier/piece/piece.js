const Piece = require("../../../class/atelier/piece/piece")

module.exports = (app, servicePiece, stock_pieceService, jwt) => {

    app.get('/piece', async (req, res) => {
        return res.json(await servicePiece.dao.getAll())
    })

    app.get('/piece/type/:id_type_piece', async (req, res) => {
        return res.json(await servicePiece.getAllPieceByType(req.params.id_type_piece))
    })
    
    app.post('/piece/add', async (req, res) => {
        try{
            const id_stock = await stock_pieceService.insert(0).then((res) => res.rows[0])
            console.log("idstock :" + id_stock.id_stock_piece)
            res.json(await servicePiece.insert(req.body.reference, 
                req.body.label,
                req.body.prix_vente,
                req.body.prix_achat,
                id_stock.id_stock_piece,
                req.body.id_type_piece,
                req.body.id_fournisseur_piece))

        }catch(error) {
            console.log(error)
            res.status(500).end()
        }
    })
}