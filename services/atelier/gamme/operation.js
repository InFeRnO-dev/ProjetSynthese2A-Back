const OperationDAO = require("../../../datamodel/atelier/gamme/operation")
const Operation = require('../../../class/atelier/gamme/operation')

module.exports = class OperationService {
    constructor(db) {
        this.dao = new OperationDAO(db)
    }

    async getAll(){
        return this.dao.getAll()
    }

    async insert(label, id_poste_machine, temps_travail){
        return this.dao.insert(new Operation(label, id_poste_machine, temps_travail))
    }
    
}