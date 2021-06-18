const BaseDAO = require('./basedao')

module.exports = class UserdroitsDAO extends BaseDAO {
    constructor(db) {
        super(db, "user_droits")
    }

    getAll() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.user_droits")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    insert(id_droits, id_user) {
        return this.db.query("INSERT INTO public.user_droits(id_droits, id_user) values ($1,$2)",
            [id_droits, id_user])
    }
    delete(id_droits, id_user) {
        return this.db.query("DELETE FROM public.user_droits WHERE id_droits=$1 AND id_user=$2",
        [id_droits, id_user])
    }
}