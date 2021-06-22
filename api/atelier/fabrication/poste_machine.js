module.exports = (app, servicePoste_Machine, jwt) => {

    app.get('/poste_machine', async (req, res) => {
        return res.json(await servicePoste_Machine.dao.getAll())
    })

    app.get('/poste_machine/poste_travail/:id', async (req, res) => {
        const id = req.params.id
        return res.json(await servicePoste_Machine.dao.getAllMachinesByIdPosteTravail(id))
    })

    app.get('/poste_machine/machine', async (req, res) => {
        return res.json(await servicePoste_Machine.dao.getAllMachinesWithoutPosteTravail())
    })

    app.post('/poste_machine/add', async (req, res) => {
        try{
            const id_poste_travail = req.body.id_poste_travail
            const id_machine = req.body.id_machine
            servicePoste_Machine.insert(id_poste_travail, id_machine)
            res.status(200).end()
        }catch(error){
            console.log(error)
            res.status(500).end()
        }
    })

    app.delete('/poste_machine/:id_poste_travail/:id_machine', async (req, res) => {
        try{
            const id_poste_travail = req.params.id_poste_travail
            const id_machine = req.params.id_machine
            servicePoste_Machine.delete(id_poste_travail, id_machine)
            res.status(200).end()
        }catch(error){
            console.log(error)
            res.status(500).end()
        }
    })
}