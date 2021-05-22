const BaseDAO = require('./basedao')

module.exports = class UserDAO extends BaseDAO {
    constructor(db) {
        super(db, "user")
    }

    getAll() {
        console.log("getalldao")
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.user")
                .then(response => {resolve(response.rows)})
                .catch(e => {reject(e)}))
    }

    getUserById(id) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.user WHERE id_user=$1",
                [id])
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e)))
    }
    getByEmail(email) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.user WHERE email=$1", [ email ])
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e)))
    }
    insert(user) {
        return this.db.query("INSERT INTO public.user(email,password,id_droits) VALUES ($1,$2,$3)",
            [user.email, user.password, user.id_droits])
    }
}