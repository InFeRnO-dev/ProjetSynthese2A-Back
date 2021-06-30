const BaseDAO = require('../../basedao')

module.exports = class Stock_PieceDAO extends BaseDAO {
    constructor(db) {
        super(db, "stock_piece")
    }

    getAll(){
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.stock_piece")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    insert(stock){
        console.log(stock)
        return this.db.query("INSERT INTO public.stock_piece(quantite) values ($1) RETURNING id_stock_piece",
            [stock.quantite])
    }

    update(id_stock_piece, quantite) {
        console.log(id_stock_piece, quantite)
        return this.db.query("UPDATE public.stock_piece SET quantite=$1 WHERE id_stock_piece=$2",
        [quantite, id_stock_piece])
    }

}