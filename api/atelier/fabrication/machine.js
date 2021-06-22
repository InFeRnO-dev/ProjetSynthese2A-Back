module.exports = (app, serviceMachine, jwt) => {

    app.get('/machine', async (req, res) => {
        return res.json(await serviceMachine.dao.getAll())
    })

    app.post('/machine/add', async (req, res) => {
        try{
        const label = req.body.label
        serviceMachine.insert(label)
        res.status(200).end()
        }catch(error) {
            console.log(error)
            res.status(500).end()
        }

    })
}