const BaseDAO = require('../../basedao')

module.exports = class MachineDAO extends BaseDAO {
    constructor(db) {
        super(db, "machine")
    }

    getAll(){
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.machine")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    insert(machine) {
        console.log(machine)
        return this.db.query("INSERT INTO public.machine(label) values ($1)",
            [machine.label])
    }

}