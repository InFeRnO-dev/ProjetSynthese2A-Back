const MachineDAO = require("../../../datamodel/atelier/fabrication/machine")
const Machine = require('../../../class/atelier/fabrication/machine')

module.exports = class Poste_TravailService {
    constructor(db) {
        this.dao = new MachineDAO(db)
    }

    async getAll(){
        return this.dao.getAll()
    }

    async insert(machine){
        return this.dao.insert(new Machine(machine))
    }
}