const BaseDAO = require('../../basedao')

module.exports = class Poste_MachineDAO extends BaseDAO {
    constructor(db) {
        super(db, "machine")
    }

    getAll(){
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.poste_machine")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    
    getAllMachinesByIdPosteTravail(id) {
        console.log(id)
        return new Promise((resolve, reject) =>
            this.db.query("SELECT public.machine.id_machine , public.machine.label FROM public.poste_machine LEFT JOIN public.machine on public.machine.id_machine = public.poste_machine.id_machine WHERE public.poste_machine.id_poste_travail = $1",
            [id])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    getAllMachinesWithoutPosteTravail() {
        return new Promise((resolve, reject) =>
        this.db.query("SELECT public.machine.id_machine, public.machine.label FROM public.poste_machine RIGHT JOIN public.machine on public.machine.id_machine = public.poste_machine.id_machine WHERE public.poste_machine.id_poste_travail is null")
            .then(res => resolve(res.rows))
            .catch(e => reject(e)))
    }

    insert(postemachine) {
        console.log(postemachine)
        return this.db.query("INSERT INTO public.poste_machine(id_poste_travail, id_machine) values ($1,$2)",
        [postemachine.id_poste_travail, postemachine.id_machine])
    }

    delete(postemachine) {
        console.log(postemachine)
        return this.db.query("DELETE FROM public.poste_machine WHERE id_poste_travail=$1 AND id_machine=$2",
        [postemachine.id_poste_travail, postemachine.id_machine])
    }
}