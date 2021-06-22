module.exports = (app, serviceDroits, jwt) => {

    app.get('/droits', async (req, res) => {
        return res.json(await serviceDroits.dao.getAll())
    })

    app.get('/droits/:id', async (req, res) => {
        return res.json(await serviceDroits.dao.getAllDroitsByUserDroits(req.params.id))
    })
}