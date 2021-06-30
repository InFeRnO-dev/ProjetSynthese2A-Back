const Fournisseur_PieceDAO = require("../../../datamodel/atelier/piece/fournisseur_piece")
const Fournisseur_Piece = require('../../../class/atelier/piece/fournisseur_piece')

module.exports = class Fournisseur_PieceService {
    constructor(db) {
        this.dao = new Fournisseur_PieceDAO(db)
    }

    async getAll(){
        return this.dao.getAll()
    }
    
    async insert(label){
        return this.dao.insert(new Fournisseur_Piece(label))
    }
}