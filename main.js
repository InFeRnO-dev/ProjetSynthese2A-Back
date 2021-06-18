const pg = require('pg')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const UserService = require("./services/user")
const DroitsService = require("./services/droits")
const UserdroitsService = require("./services/user_droits")

const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // URLEncoded form data
app.use(bodyParser.json()) // application/json
app.use(cors())
app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur


//const connectionString = "postgres://postgres:root@localhost:5432/ps2a"
const connectionString = "postgres://postgres:root@127.0.0.1:5432/ps2a"
//const connectionString = "dbprojetsynthese.clotqmgbrjwd.us-east-1.rds.amazonaws.com"
const db = new pg.Pool({ connectionString: connectionString })

const userService = new UserService(db)
const droitsService = new DroitsService(db)
const userdroitsService = new UserdroitsService(db)
const jwt = require('./jwt')(userService, droitsService, userdroitsService)

require("./api/user")(app, userService, jwt)
require("./api/droits")(app, droitsService, jwt)
require("./api/user_droits")(app, userdroitsService, jwt)

require('./datamodel/seeder')(userService, droitsService, userdroitsService)
   .then(app.listen(3333))
console.log("app listen on port 3333")

