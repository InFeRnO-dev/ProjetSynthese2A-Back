module.exports = (app, serviceQualification, jwt) => {

    app.get('/qualification', async (req, res) => {
        return res.json(await serviceQualification.dao.getAll())
    })

    app.get('/qualification/poste_travail/:id', async (req, res) => {
        const id_poste_travail = req.params.id
        return res.json(await serviceQualification.dao.getAllQualificationByIdPosteTravail(id_poste_travail))
    })

    app.post('/qualification/add', async (req, res) => {
        try{
            const id_user = req.body.id_user
            const id_poste_travail = req.body.id_poste_travail
            serviceQualification.insert(id_user, id_poste_travail)
            res.status(200).end()
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

    app.delete('/qualification/delete/:id_poste_travail/:id_user', (req, res) => {
        try{
            const id_poste_travail = req.params.id_poste_travail
            const id_user = req.params.id_user
            serviceQualification.delete(id_user, id_poste_travail)
            .then(res.status(200).end())

        }catch(e){
            res.status(500).end()
            console.log(e)
        }
    })
}