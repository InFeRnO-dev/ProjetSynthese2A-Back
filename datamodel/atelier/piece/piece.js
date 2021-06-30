const BaseDAO = require('../../basedao')

module.exports = class PieceDAO extends BaseDAO {
    constructor(db) {
        super(db, "piece")
    }

    getAll(){
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT public.piece.id_piece,
                                  public.piece.reference,
                                  public.piece.label,
                                  public.piece.prix_vente,
                                  public.piece.prix_achat,
                                  public.stock_piece.id_stock_piece,
                                 (public.stock_piece.quantite) as stock,
                                 (public.type_piece.label) as type,
                                 (public.fournisseur_piece.label) as fournisseur,
                                 (public.gamme.id_gamme) as gamme
                           FROM public.piece
                           LEFT JOIN public.stock_piece on public.piece.id_stock_piece = public.stock_piece.id_stock_piece
                           LEFT JOIN public.type_piece on public.piece.id_type_piece = public.type_piece.id_type_piece
                           LEFT JOIN public.fournisseur_piece on public.piece.id_fournisseur_piece = public.fournisseur_piece.id_fournisseur_piece
                           LEFT JOIN public.gamme on public.piece.id_piece = public.gamme.id_piece
                           ORDER BY public.piece.id_piece ASC`)
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    getAllPieceByType(id_type_piece){
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT public.piece.id_piece,
                                  public.piece.reference,
                                  public.piece.label,
                                  public.piece.prix_vente,
                                  public.piece.prix_achat,
                                  public.stock_piece.id_stock_piece,
                                 (public.stock_piece.quantite) as stock,
                                 (public.type_piece.label) as type,
                                 (public.fournisseur_piece.label) as fournisseur,
                                 (public.gamme.id_gamme) as gamme
                           FROM public.piece
                           LEFT JOIN public.stock_piece on public.piece.id_stock_piece = public.stock_piece.id_stock_piece
                           LEFT JOIN public.type_piece on public.piece.id_type_piece = public.type_piece.id_type_piece
                           LEFT JOIN public.fournisseur_piece on public.piece.id_fournisseur_piece = public.fournisseur_piece.id_fournisseur_piece
                           LEFT JOIN public.gamme on public.piece.id_piece = public.gamme.id_piece
                           WHERE public.piece.id_type_piece = $1
                           ORDER BY public.piece.id_piece ASC`,
                           [id_type_piece])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    insert(piece){
        console.log(piece)
        return this.db.query("INSERT INTO public.piece(reference, label, prix_vente, prix_achat, id_stock_piece, id_type_piece, id_fournisseur_piece) values ($1,$2,$3,$4,$5,$6,$7) RETURNING id_piece",
            [piece.reference, piece.label, piece.prix_vente, piece.prix_achat, piece.id_stock_piece, piece.id_type_piece, piece.id_fournisseur_piece])
    }

}