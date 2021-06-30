const BaseDAO = require('../../basedao')

module.exports = class OperationDAO extends BaseDAO {
    constructor(db) {
        super(db, "operation")
    }

    getAll(){
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT public.operation.id_operation,
                                  public.operation.label,
                                  public.poste_travail.label as poste_travail,
                                  public.machine.label as machine,
                                  public.operation.temps_travail
                           FROM public.operation
                           LEFT JOIN public.poste_machine on public.poste_machine.id_poste_machine = public.operation.id_poste_machine
                           LEFT JOIN public.poste_travail on public.poste_machine.id_poste_travail = public.poste_travail.id_poste_travail
                           LEFT JOIN public.machine on public.poste_machine.id_machine = public.machine.id_machine`)
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    insert(operation) {
        console.log(operation)
        return this.db.query("INSERT INTO public.operation(label, id_poste_machine, temps_travail) values ($1,$2,$3) RETURNING id_operation",
            [operation.label, operation.id_poste_machine, operation.temps_travail])
    }

}