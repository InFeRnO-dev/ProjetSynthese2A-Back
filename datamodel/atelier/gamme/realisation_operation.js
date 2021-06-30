const BaseDAO = require('../../basedao')

module.exports = class Realisation_OperationDAO extends BaseDAO {
    constructor(db) {
        super(db, "realisation_operation")
    }

    getAll(){
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT * from realisation_operation`)
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    getRealisationOperationByIdRealisation(id_realisation){
        return new Promise((resolve, reject) => 
            this.db.query(`SELECT public.realisation_operation.id_realisation,
                                  public.operation.label as operation,
                                  public.poste_travail.label as poste_travail,
                                  public.machine.label as machine,
                                  public.gamme.id_gamme,
                                  public.gamme.label as gamme
                           FROM public.realisation_operation
                           LEFT JOIN public.operation on public.operation.id_operation = public.realisation_operation.id_operation
                           LEFT JOIN public.poste_machine on public.poste_machine.id_poste_machine = public.operation.id_poste_machine
                           LEFT JOIN public.poste_travail on public.poste_travail.id_poste_travail = public.poste_machine.id_poste_travail
                           LEFT JOIN public.machine on public.machine.id_machine = public.poste_machine.id_machine
                           LEFT JOIN public.gamme_operation on public.gamme_operation.id_operation = public.operation.id_operation
                           LEFT JOIN public.gamme on public.gamme.id_gamme = public.gamme_operation.id_gamme
                           WHERE public.realisation_operation.id_realisation = $1`,
                           [id_realisation])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    insert(realisation_operation) {
        console.log(realisation_operation)
        return this.db.query("INSERT INTO public.realisation_operation(id_realisation, id_operation) values ($1,$2)",
            [realisation_operation.id_realisation, realisation_operation.id_operation])
    }

}