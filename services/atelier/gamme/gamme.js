const GammeDAO = require("../../../datamodel/atelier/gamme/gamme")
const Gamme = require('../../../class/atelier/gamme/gamme')

module.exports = class GammeService {
    constructor(db) {
        this.dao = new GammeDAO(db)
    }

    async getAll(){
        return this.dao.getAll()
    }

    async getByIdPiece(id_piece){
        return this.dao.getByIdPiece(id_piece)
    }

    async insert(label, id_user, id_piece){
        return this.dao.insert(new Gamme(label, id_user, id_piece))
    }

    async update(id_gamme, label, id_user){
        return this.dao.update(id_gamme, label, id_user)
    }
    
}