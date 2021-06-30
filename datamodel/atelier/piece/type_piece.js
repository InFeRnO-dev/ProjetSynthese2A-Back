const BaseDAO = require('../../basedao')

module.exports = class Type_PieceDAO extends BaseDAO {
    constructor(db) {
        super(db, "type_piece")
    }

    getAll(){
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.type_piece")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    insert(type){
        console.log(type)
        return this.db.query("INSERT INTO public.type_piece(label) values ($1)",
            [type.label])
    }

}