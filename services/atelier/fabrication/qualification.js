const QualificationDao = require("../../../datamodel/atelier/fabrication/qualification")
const Qualification = require('../../../class/atelier/fabrication/qualification')

module.exports = class QualificationService {
    constructor(db) {
        this.dao = new QualificationDao(db)
    }

    async getAll(){
        return this.dao.getAll()
    }

    async getQualificationByIdUser(id){
        return this.dao.getQualificationByIdUser(id)
    }

    async insert(id_user, id_poste_travail){
        return this.dao.insert(new Qualification(id_user, id_poste_travail))
    }
    
    async delete(id_user, id_poste_travail) {
        return this.dao.delete(id_user, id_poste_travail)
    }
}