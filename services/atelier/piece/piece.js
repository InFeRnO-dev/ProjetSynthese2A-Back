const PieceDAO = require("../../../datamodel/atelier/piece/piece")
const Piece = require('../../../class/atelier/piece/piece')

module.exports = class PieceService {
    constructor(db) {
        this.dao = new PieceDAO(db)
    }

    async getAll(){
        return this.dao.getAll()
    }

    async getAllPieceByType(id_type_piece){
        return this.dao.getAllPieceByType(id_type_piece)
    }
    
    async insert(reference, label, prix_vente, prix_achat, id_stock_piece, id_type_piece, id_fournisseur_piece){
        return this.dao.insert(new Piece(reference, label, prix_vente, prix_achat, id_stock_piece, id_type_piece, id_fournisseur_piece))
    }
}