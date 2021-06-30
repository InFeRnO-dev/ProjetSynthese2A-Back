const BaseDAO = require('../basedao')

module.exports = class DroitsDAO extends BaseDAO {
    constructor(db) {
        super(db, "droits")
    }

    getAll() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.droits")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    getAllDroitsByUserDroits(id) {
        return new Promise((resolve, reject) => 
            this.db.query("SELECT public.droits.id_droits,public.droits.label FROM public.droits LEFT JOIN public.user_droits on public.droits.id_droits = public.user_droits.id_droits WHERE public.user_droits.id_user = $1",
            [id])
            .then(res => resolve(res.rows))
            .catch(e => reject(e)))
    }

    insert(droits) {
        console.log(droits)
        return this.db.query("INSERT INTO public.droits(id_droits, label) values ($1,$2)",
            [droits.id_droits, droits.label])
    }
}