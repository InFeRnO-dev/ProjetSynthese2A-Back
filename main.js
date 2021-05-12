const pg = require('pg')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const UserService = require("./services/user")
const ListService = require("./services/list")

const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // URLEncoded form data
app.use(bodyParser.json()) // application/json
app.use(cors())
app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur

const connectionString = "postgresql://postgres:root@localhost:5432/ps2a"
//const connectionString = "dbprojetsynthese.clotqmgbrjwd.us-east-1.rds.amazonaws.com"
const db = new pg.Pool({ connectionString: connectionString })

db.query('SELECT * FROM projet.user', (err, res) => {
    console.log(err, res)
    db.end()
})

const userService = new UserService(db)
const listService = new ListService(db)
const jwt = require('./jwt')(userService)

require('./api/user')(app, userService, jwt)
require('./api/list')(app, listService, jwt)
//require('./api/item')(app, itemService, jwt)
//require('./api/partage')(app, partageService, listService, jwt)

//require('./datamodel/seeder')(userService)
//    .then(app.listen(3333,"localhost"))
app.listen(3333,"localhost")
console.log("app listen on port 3333")

