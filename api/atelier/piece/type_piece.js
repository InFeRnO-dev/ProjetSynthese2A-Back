module.exports = (app, serviceType_Piece, jwt) => {

    app.get('/type_piece', async (req, res) => {
        return res.json(await serviceType_Piece.dao.getAll())
    })

    app.get('/type_piece/wlivrable', async (req, res) => {
        return res.json(await serviceType_Piece.getAllPieceWithoutLivrable())
    })
    
}