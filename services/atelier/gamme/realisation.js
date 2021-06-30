const RealisationDAO = require("../../../datamodel/atelier/gamme/realisation")
const Realisation = require('../../../class/atelier/gamme/realisation')

module.exports = class RealisationService {
    constructor(db) {
        this.dao = new RealisationDAO(db)
    }

    async getAll(){
        return this.dao.getAll()
    }

    async insert(date, id_gamme){
        return this.dao.insert(new Realisation(date, id_gamme))
    }
    
}