const BaseDAO = require('../../basedao')

module.exports = class Fournisseur_PieceDAO extends BaseDAO {
    constructor(db) {
        super(db, "fournisseur_piece")
    }

    getAll(){
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.fournisseur_piece")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    insert(fournisseur){
        console.log(fournisseur)
        return this.db.query("INSERT INTO public.fournisseur_piece(label) values ($1)",
            [fournisseur.label])
    }

}