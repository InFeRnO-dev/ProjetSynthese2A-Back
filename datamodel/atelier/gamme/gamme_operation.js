const BaseDAO = require('../../basedao')

module.exports = class Gamme_OperationDAO extends BaseDAO {
    constructor(db) {
        super(db, "gamme_operation")
    }

    getAll(){
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.gamme_operation")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    getGammeOperationByIdGamme(id_gamme) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT public.gamme_operation.id_gamme, 
                                  public.gamme_operation.id_operation,
                                  public.operation.label,
                                  public.poste_travail.label as poste_travail,
                                  public.machine.label as machine,
                                  public.operation.temps_travail
                           FROM public.gamme_operation
                           LEFT JOIN public.operation on public.operation.id_operation = public.gamme_operation.id_operation
                           LEFT JOIN public.poste_machine on public.poste_machine.id_poste_machine = public.operation.id_poste_machine
                           LEFT JOIN public.poste_travail on public.poste_travail.id_poste_travail = public.poste_machine.id_poste_travail
                           LEFT JOIN public.machine on public.machine.id_machine = public.poste_machine.id_machine
                           WHERE public.gamme_operation.id_gamme = $1`,
                           [id_gamme])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    insert(gamme_operation) {
        console.log(gamme_operation)
        return this.db.query("INSERT INTO public.gamme_operation(id_gamme, id_operation) values ($1,$2)",
            [gamme_operation.id_gamme, gamme_operation.id_operation])
    }

}