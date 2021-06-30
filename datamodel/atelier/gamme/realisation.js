const BaseDAO = require('../../basedao')

module.exports = class RealisationDAO extends BaseDAO {
    constructor(db) {
        super(db, "realisation")
    }

    getAll(){
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT public.realisation.id_realisation,
                                  public.realisation.date,
                                  public.gamme.label as gamme
                           FROM public.realisation
                           LEFT JOIN public.gamme_operation on public.gamme_operation.id_gamme = public.realisation.id_gamme
                           LEFT JOIN public.gamme on public.gamme.id_gamme = public.gamme_operation.id_gamme`)
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    insert(realisation) {
        console.log(realisation)
        return this.db.query("INSERT INTO public.realisation(date, id_gamme) values ($1,$2) RETURNING id_realisation",
            [realisation.date, realisation.id_gamme])
    }

}