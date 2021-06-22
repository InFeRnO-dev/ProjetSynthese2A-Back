const pg = require('pg')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const UserService = require("./services/user-droits/user")
const DroitsService = require("./services/user-droits/droits")
const UserdroitsService = require("./services/user-droits/user_droits")
const Poste_TravailService = require("./services/atelier/fabrication/poste_travail")
const QualificationService = require("./services/atelier/fabrication/qualification")
const MachineService = require("./services/atelier/fabrication/machine")
const Poste_MachineService = require("./services/atelier/fabrication/poste_machine")

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
const poste_travailService = new Poste_TravailService(db)
const qualificationService = new QualificationService(db)
const machineService = new MachineService(db)
const poste_machineService = new Poste_MachineService(db)

const jwt = require('./jwt')(userService,
                             droitsService,
                             userdroitsService,
                             poste_travailService,
                             qualificationService,
                             machineService,
                             poste_machineService
                            )

require("./api/user-droits/user")(app, userService, jwt)
require("./api/user-droits/droits")(app, droitsService, jwt)
require("./api/user-droits/user_droits")(app, userdroitsService, jwt)
require("./api/atelier/fabrication/poste_travail")(app, poste_travailService, jwt)
require("./api/atelier/fabrication/qualification")(app, qualificationService, jwt)
require("./api/atelier/fabrication/machine")(app, machineService, jwt)
require("./api/atelier/fabrication/poste_machine")(app, poste_machineService, jwt)

require('./datamodel/seeder')(userService,
                              droitsService,
                              userdroitsService,
                              poste_travailService,
                              qualificationService,
                              machineService,
                              poste_machineService
                             )
   .then(app.listen(3333))
console.log("app listen on port 3333")

