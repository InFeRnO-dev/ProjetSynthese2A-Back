const DroitsDAO = require("../datamodel/droitsdao")
const Droits = require('../class/droits')

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

    async insert(droits){
        return this.dao.insert(new Droits(droits))
    }
}