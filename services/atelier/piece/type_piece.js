const Type_PieceDAO = require("../../../datamodel/atelier/piece/type_piece")
const Type_Piece = require('../../../class/atelier/piece/type_piece')

module.exports = class Type_PieceService {
    constructor(db) {
        this.dao = new Type_PieceDAO(db)
    }

    async getAll(){
        return this.dao.getAll()
    }
    
    async getAllPieceWithoutLivrable(){
        return this.dao.getAllPieceWithoutLivrable()
    }

    async insert(label){
        return this.dao.insert(new Type_Piece(label))
    }
    
}