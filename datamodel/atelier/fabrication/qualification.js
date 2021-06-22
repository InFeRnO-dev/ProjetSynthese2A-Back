const BaseDAO = require('../../basedao')

module.exports = class QualificationDao extends BaseDAO {
    constructor(db) {
        super(db, "qualification")
    }

    getAll(){
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.qualification")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    getQualificationByIdUser(id){
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.qualification WHERE id_user=$1",
            [id])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    getAllQualificationByIdPosteTravail(id){
        return new Promise((resolve, reject) =>
            this.db.query("SELECT public.qualification.id_poste_travail, public.user.id_user, public.user.email FROM public.qualification LEFT JOIN public.user on public.qualification.id_user = public.user.id_user WHERE public.qualification.id_poste_travail=$1",
            [id])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    insert(qualification) {
        console.log(qualification)
        return this.db.query("INSERT INTO public.qualification(id_user,id_poste_travail) values ($1,$2)",
            [qualification.id_user, qualification.id_poste_travail])
    }

    delete(id_user, id_poste_travail) {
        console.log(id_user, id_poste_travail)
        return this.db.query("DELETE FROM public.qualification WHERE id_user=$1 AND id_poste_travail=$2",
        [id_user, id_poste_travail])
    }
}