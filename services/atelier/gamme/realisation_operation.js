const Realisation_OperationDAO = require("../../../datamodel/atelier/gamme/realisation_operation")
const Realisation_Operation = require('../../../class/atelier/gamme/realisation_operation')

module.exports = class RealisationOperationService {
    constructor(db) {
        this.dao = new Realisation_OperationDAO(db)
    }

    async getAll(){
        return this.dao.getAll()
    }

    async getRealisationOperationByIdRealisation(id_realisation){
        return this.dao.getRealisationOperationByIdRealisation(id_realisation)
    }

    async insert(id_realisation, id_operation){
        return this.dao.insert(new Realisation_Operation(id_realisation, id_operation))
    }
    
}