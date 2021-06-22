const Poste_TravailDAO = require("../../../datamodel/atelier/fabrication/poste_travail")
const Poste_Travail = require('../../../class/atelier/fabrication/poste_travail')

module.exports = class Poste_TravailService {
    constructor(db) {
        this.dao = new Poste_TravailDAO(db)
    }

    async getAll(){
        return this.dao.getAll()
    }

    async insert(label){
        return this.dao.insert(new Poste_Travail(label))
    }
}