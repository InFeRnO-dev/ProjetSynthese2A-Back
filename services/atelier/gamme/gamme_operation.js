const Gamme_OperationDAO = require("../../../datamodel/atelier/gamme/gamme_operation")
const Gamme_Operation = require('../../../class/atelier/gamme/gamme_operation')

module.exports = class Gamme_OperationService {
    constructor(db) {
        this.dao = new Gamme_OperationDAO(db)
    }

    async getAll(){
        return this.dao.getAll()
    }

    async getGammeOperationByIdGamme(id_gamme){
        return this.dao.getGammeOperationByIdGamme(id_gamme)
    }

    async insert(id_gamme, id_operation){
        return this.dao.insert(new Gamme_Operation(id_gamme, id_operation))
    }
    
}