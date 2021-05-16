const DroitsDAO = require("../datamodel/droitsdao")
const Droits = require('../class/droits')

module.exports = class DroitsService {
    constructor(db) {
        this.dao = new DroitsDAO(db)
    }

    async getAll(){
        return this.dao.getAll()
    }
}