const BaseDAO = require('../../basedao')

module.exports = class Poste_TravailDAO extends BaseDAO {
    constructor(db) {
        super(db, "poste_travail")
    }

    getAll(){
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.poste_travail ORDER BY id_poste_travail")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    insert(postetravail) {
        console.log(postetravail)
        return this.db.query("INSERT INTO public.poste_travail(label) values ($1)",
            [postetravail.label])
    }

}