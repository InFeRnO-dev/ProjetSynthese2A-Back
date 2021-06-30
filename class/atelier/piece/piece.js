module.exports = class Piece {
    constructor(reference, label, prix_vente, prix_achat, id_stock_piece,id_type_piece, id_fournisseur_piece) {
        this.reference = reference
        this.label = label
        this.prix_vente = prix_vente
        this.prix_achat = prix_achat
        this.id_stock_piece = id_stock_piece
        this.id_type_piece = id_type_piece
        this.id_fournisseur_piece = id_fournisseur_piece
    }
}