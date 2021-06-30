const BaseDAO = require('../../basedao')

module.exports = class CompositionDAO extends BaseDAO {
    constructor(db) {
        super(db, "composition")
    }

    getAll(){
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.composition")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    insert(composition){
        console.log(composition)
        return this.db.query("INSERT INTO public.composition(id_piece_cree, id_piece_composition, quantite) values ($1,$2,$3)",
            [composition.id_piece_cree, composition.id_piece_composition, composition.quantite])
    }

}