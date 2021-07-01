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

    getCompositionByIdPieceCree(id_piece_cree){
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT public.composition.id_composition,
                                  public.composition.id_piece_cree,
                                  public.composition.id_piece_composition,
                                  public.composition.quantite,
                                  public.piece.reference,
                                  public.piece.label
                           FROM public.composition
                           INNER JOIN public.piece on public.piece.id_piece = public.composition.id_piece_composition
                           WHERE public.composition.id_piece_cree = $1`,
                           [id_piece_cree])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    insert(composition){
        console.log(composition)
        return this.db.query("INSERT INTO public.composition(id_piece_cree, id_piece_composition, quantite) values ($1,$2,$3)",
            [composition.id_piece_cree, composition.id_piece_composition, composition.quantite])
    }

    delete(id_composition){
        console.log(id_composition)
        return this.db.query("DELETE FROM public.composition WHERE id_composition = $1",
        [id_composition])
    }

}