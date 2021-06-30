const DroitsDAO = require("../../datamodel/user-droits/droitsdao")
const Droits = require('../../class/user-droits/droits')

module.exports = class DroitsService {
    constructor(db) {
        this.dao = new DroitsDAO(db)
    }

    async getAll(){
        return this.dao.getAll()
    }

    async getAllDroitsByUserDroits(){
        return this.dao.getAllDroitsByUserDroits()
    }

    async insert(id_droits, label){
        return this.dao.insert(new Droits(id_droits, label))
    }
}