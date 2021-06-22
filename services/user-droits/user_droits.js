const UserdroitsDAO = require("../../datamodel/user-droits/user_droitsdao")
const Userdroits = require('../../class/user-droits/user_droits')

module.exports = class UserdroitsService {
    constructor(db) {
        this.dao = new UserdroitsDAO(db)
    }

    async getAll(){
        return this.dao.getAll()
    }

    async insert(id_droits, id_user){
        return this.dao.insert(id_droits, id_user)
    }

    async delete(id_droits, id_user){
        return this.dao.delete(id_droits, id_user)
    }
}