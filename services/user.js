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
        return this.dao.insert(new User(email, this.hashPassword(password)))
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