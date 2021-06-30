module.exports = (app, serviceRealisation, jwt) => {

    app.get('/realisation', async (req, res) => {
        return res.json(await serviceRealisation.dao.getAll())
    })

    app.post('/realisation/add', async (req, res) => {
        const date = new Date()
        try{
            res.json(await serviceRealisation.insert(date, req.body.id_gamme))
        }catch(error){
            console.log(error)
            res.status(500).end()
        }
    })
    
}