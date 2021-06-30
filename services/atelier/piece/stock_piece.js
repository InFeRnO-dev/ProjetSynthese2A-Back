const Stock_PieceDAO = require("../../../datamodel/atelier/piece/stock_piece")
const Stock_Piece = require('../../../class/atelier/piece/stock_piece')

module.exports = class Stock_PieceService {
    constructor(db) {
        this.dao = new Stock_PieceDAO(db)
    }

    async getAll(){
        return this.dao.getAll()
    }
    
    async insert(quantite){
        return this.dao.insert(new Stock_Piece(quantite))
    }

    async update(id_stock_piece, quantite){
        return this.dao.update(id_stock_piece, quantite)
    }
}