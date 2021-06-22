module.exports = (app, servicePoste_Travail, jwt) => {

    app.get('/poste_travail', async (req, res) => {
        return res.json(await servicePoste_Travail.dao.getAll())
    })

    app.post('/poste_travail/add', async (req, res) => {
        try{
            const label = req.body.label
            servicePoste_Travail.insert(label)
            res.status(200).end
        }catch(error){
            console.log(error)
            res.status(500).end()
        }
    })
}