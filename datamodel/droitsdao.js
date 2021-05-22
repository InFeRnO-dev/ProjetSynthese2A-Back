const BaseDAO = require('./basedao')

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
    insert(droits) {
        console.log(droits)
        return this.db.query("INSERT INTO public.droits(label) values ($1)",
            [droits.label])
    }
}