const bcrypt = require('bcrypt')
const UserDAO = require("../datamodel/userdao")
const User = require('../class/user')

module.exports = class UserService {
    constructor(db) {
        this.dao = new UserDAO(db)
    }

    async getAll(){
        return this.dao.getAll()
    }

    inserthash(email, password) {
        console.log(email, password)
        return this.dao.insert(email, this.hashPassword(password))
    }
    update(id, email, password){
        if(password === "" || password === undefined || password === null){
            return this.dao.update(id, email, password)
        }
        else{
            return this.dao.update(id, email, this.hashPassword(password))
        }
    }
    delete(id){
        return this.dao.delete(id)
    }
    async validatePassword(email, password) {
        console.log(email, password)
        const user = await this.dao.getByEmail(email.trim())
        console.log(user)
        return this.comparePassword(password, user.password)
    }
    comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash)
    }
    hashPassword(password) {
        return bcrypt.hashSync(password, 5)
    }

}