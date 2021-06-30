const pg = require('pg')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

//Service user_droits
const UserService = require("./services/user-droits/user")
const DroitsService = require("./services/user-droits/droits")
const UserdroitsService = require("./services/user-droits/user_droits")

//Service atelier fabrication

const Poste_TravailService = require("./services/atelier/fabrication/poste_travail")
const QualificationService = require("./services/atelier/fabrication/qualification")
const MachineService = require("./services/atelier/fabrication/machine")
const Poste_MachineService = require("./services/atelier/fabrication/poste_machine")

//Service atelier piece

const PieceService = require('./services/atelier/piece/piece')
const Fournisseur_PieceService = require('./services/atelier/piece/fournisseur_piece')
const Stock_PieceService = require('./services/atelier/piece/stock_piece')
const Type_PieceService = require('./services/atelier/piece/type_piece')
const Composition = require('./services/atelier/piece/composition')

//Service atelier gamme

const GammeService = require('./services/atelier/gamme/gamme')
const OperationService = require('./services/atelier/gamme/operation')
const Gamme_OperationService = require('./services/atelier/gamme/gamme_operation')
const RealisationService = require('./services/atelier/gamme/realisation')
const Realisation_OperationService = require('./services/atelier/gamme/realisation_operation')

const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // URLEncoded form data
app.use(bodyParser.json()) // application/json
app.use(cors())
app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur


//const connectionString = "postgres://postgres:root@localhost:5432/ps2a"
const connectionString = "postgres://postgres:root@127.0.0.1:5432/ps2a"
//const connectionString = "dbprojetsynthese.clotqmgbrjwd.us-east-1.rds.amazonaws.com"
const db = new pg.Pool({ connectionString: connectionString })

//New Service user-droits

const userService = new UserService(db)
const droitsService = new DroitsService(db)
const userdroitsService = new UserdroitsService(db)

//New Service atelier fabrication

const poste_travailService = new Poste_TravailService(db)
const qualificationService = new QualificationService(db)
const machineService = new MachineService(db)
const poste_machineService = new Poste_MachineService(db)

//New Service atelier piece

const pieceService = new PieceService(db)
const fournisseur_pieceService = new Fournisseur_PieceService(db)
const stock_pieceService = new Stock_PieceService(db)
const type_pieceService = new Type_PieceService(db)
const compositionService = new Composition(db)

//New Service atelier gamme

const gammeService = new GammeService(db)
const operationService = new OperationService(db)
const gamme_operationService = new Gamme_OperationService(db)
const realisationService = new RealisationService(db)
const realisationoperationService = new Realisation_OperationService(db)

const jwt = require('./jwt')(userService,
                             droitsService,
                             userdroitsService,
                             poste_travailService,
                             qualificationService,
                             machineService,
                             poste_machineService,
                             pieceService,
                             fournisseur_pieceService,
                             stock_pieceService,
                             type_pieceService,
                             gammeService,
                             operationService,
                             gamme_operationService,
                             realisationService,
                             realisationoperationService,
                             compositionService
                            )

//Api user-droits

require("./api/user-droits/user")(app, userService, jwt)
require("./api/user-droits/droits")(app, droitsService, jwt)
require("./api/user-droits/user_droits")(app, userdroitsService, jwt)

//Api atelier fabrication

require("./api/atelier/fabrication/poste_travail")(app, poste_travailService, jwt)
require("./api/atelier/fabrication/qualification")(app, qualificationService, jwt)
require("./api/atelier/fabrication/machine")(app, machineService, jwt)
require("./api/atelier/fabrication/poste_machine")(app, poste_machineService, jwt)

//Api atelier piece

require("./api/atelier/piece/piece")(app, pieceService, stock_pieceService, jwt)
require("./api/atelier/piece/fournisseur_piece")(app, fournisseur_pieceService, jwt)
require("./api/atelier/piece/stock_piece")(app, stock_pieceService, jwt)
require("./api/atelier/piece/type_piece")(app, type_pieceService, jwt)
require("./api/atelier/piece/composition")(app, compositionService, jwt)

//Api atelier gamme

require("./api/atelier/gamme/gamme")(app, gammeService, jwt)
require("./api/atelier/gamme/operation")(app, operationService, jwt)
require("./api/atelier/gamme/gamme_operation")(app, gamme_operationService, jwt)
require("./api/atelier/gamme/realisation")(app, realisationService, jwt)
require("./api/atelier/gamme/realisation_operation")(app, realisationoperationService, jwt)

require('./datamodel/seeder')(userService,
                              droitsService,
                              userdroitsService,
                              poste_travailService,
                              qualificationService,
                              machineService,
                              poste_machineService,
                              pieceService,
                              fournisseur_pieceService,
                              stock_pieceService,
                              type_pieceService,
                              gammeService,
                              operationService,
                              gamme_operationService,
                              realisationService,
                              realisationoperationService,
                              compositionService
                             )
   .then(app.listen(3333))
console.log("app listen on port 3333")

