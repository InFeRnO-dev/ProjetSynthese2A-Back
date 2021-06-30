const Poste_MachineDAO = require("../../../datamodel/atelier/fabrication/poste_machine")
const Poste_Machine = require('../../../class/atelier/fabrication/poste_machine')

module.exports = class Poste_MachineService {
    constructor(db) {
        this.dao = new Poste_MachineDAO(db)
    }

    async getAll(){
        return this.dao.getAll()
    }

    async getPosteMachineById(id_poste_travail, id_machine){
        return this.dao.getPosteMachineById(id_poste_travail, id_machine)
    }

    async getAllMachinesWithoutPosteTravail(){
        return this.dao.getAllMachinesWithoutPosteTravail()
    }

    async insert(id_poste_travail, id_machine){
        return this.dao.insert(new Poste_Machine(id_poste_travail, id_machine))
    }

    async delete(id_poste_travail, id_machine){
        return this.dao.delete(new Poste_Machine(id_poste_travail, id_machine))
    }
}