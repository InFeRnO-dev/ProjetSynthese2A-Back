module.exports = (app, serviceFournisseur_Piece, jwt) => {

    app.get('/fournisseur_piece', async (req, res) => {
        return res.json(await serviceFournisseur_Piece.dao.getAll())
    })
    
}