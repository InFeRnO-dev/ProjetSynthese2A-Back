const BaseDAO = require('../../basedao')

module.exports = class GammeDAO extends BaseDAO {
    constructor(db) {
        super(db, "gamme")
    }

    getAll(){
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT public.gamme.id_gamme,
                                  public.gamme.label,
                                  public.user.email as user,
                                  public.piece.reference as piece
                           FROM public.gamme
                           LEFT JOIN public.user on public.user.id_user = public.gamme.id_user
                           LEFT JOIN public.piece on public.piece.id_piece = public.gamme.id_piece`)
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    getByIdPiece(id_piece){
        return new Promise((resolve, reject) => 
            this.db.query(`SELECT public.gamme.id_gamme, public.gamme.label, public.gamme.id_piece, public.user.email FROM public.gamme
                           LEFT JOIN public.user on public.user.id_user = public.gamme.id_user
                           WHERE public.gamme.id_piece = $1
                           ORDER BY public.gamme.id_gamme ASC`,
                           [id_piece])
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e)))
    }

    insert(gamme) {
        console.log(gamme)
        return this.db.query("INSERT INTO public.gamme(label, id_user,id_piece) values ($1,$2,$3)",
            [gamme.label, gamme.id_user, gamme.id_piece])
    }

    update(id_gamme, label, id_user) {
        console.log(label, id_user, id_gamme)
        return this.db.query("UPDATE public.gamme SET label=$1, id_user=$2 WHERE id_gamme=$3",
            [label, id_user, id_gamme])
    }

}