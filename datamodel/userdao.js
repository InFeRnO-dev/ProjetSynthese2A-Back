const BaseDAO = require('./basedao')

module.exports = class UserDAO extends BaseDAO {
    constructor(db) {
        super(db, "user")
    }

    getAll() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.user ORDER BY email ASC")
                .then(res => {resolve(res.rows)})
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

    getDroits(user) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT public.user.id_user, public.user.email, public.user_droits.id_droits FROM public.user LEFT JOIN public.user_droits on public.user.id_user = public.user_droits.id_user WHERE public.user.id_user=$1", [ user.id_user ])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    insert(email, password) {
        return this.db.query("INSERT INTO public.user(email,password) VALUES ($1,$2)",
            [email, password])
    }

    update(id, email, password) {
        if(password === "" || password === undefined || password === null){
            return this.db.query("UPDATE public.user SET email=$1 WHERE id_user=$2",
            [email, id])
        }else{
            return this.db.query("UPDATE public.user SET email=$1, password=$2 WHERE id_user=$3",
            [email, password, id])
        }
    }

    delete(id) {
        return this.db.query("DELETE FROM public.user WHERE id_user=$1",
        [id])
    }
}