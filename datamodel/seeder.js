
module.exports = (userService,
                  droitsService,
                  userDroitsService,
                  postetravailService,
                  qualificationService,
                  machineService,
                  postemachineService,
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
                  ) => {
    return new Promise(async (resolve, reject) => {

    /* 
                                    #### USER-DROITS #####
    */
        // creation table droits et seed droits
        
        try {
            await droitsService.dao.db.query("CREATE TABLE public.droits(id_droits SERIAL PRIMARY KEY, label TEXT)")
            // INSERTs
            droitsService.insert(1, "admin")
                .then(res => console.log(res))
                .catch(e => console.log(e))
            droitsService.insert(2, "atelier")
                .then(res => console.log(res))
                .catch(e => console.log(e))
            droitsService.insert(3, "commercial")
                .then(res => console.log(res))
                .catch(e => console.log(e))
            droitsService.insert(4, "comptabilite")
                .then(res => console.log(res))
                .catch(e => console.log(e))
            droitsService.insert(5, "responsable atelier")
                .then(res => console.log(res))
                .catch(e => console.log(e))
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table droits déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }

        // creation table user et seed user

        try {
            await userService.dao.db.query("CREATE TABLE public.user(id_user SERIAL PRIMARY KEY, email TEXT, password TEXT)")
            // INSERTs
            userService.inserthash("admin@test.com", "default")
                .then(res => console.log(res))
                .catch(e => console.log(e))
            userService.inserthash("atelier@test.com", "default")
                .then(res => console.log(res))
                .catch(e => console.log(e))
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table user déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }

        // creation table user_droits et seed user_droits

        try {
            await userDroitsService.dao.db.query("CREATE TABLE public.user_droits(id_user_droits SERIAL PRIMARY KEY, id_droits INT REFERENCES public.droits(id_droits) ON DELETE CASCADE, id_user INT REFERENCES public.user(id_user) ON DELETE CASCADE)")
            // INSERTs
            userDroitsService.insert(1,1)
                .then(res => console.log(res))
                .catch(e => console.log(e))
            userDroitsService.insert(2,1)
                .then(res => console.log(res))
                .catch(e => console.log(e))
            userDroitsService.insert(3,1)
                .then(res => console.log(res))
                .catch(e => console.log(e))
            userDroitsService.insert(4,1)
                .then(res => console.log(res))
                .catch(e => console.log(e))
            userDroitsService.insert(5,1)
                .then(res => console.log(res))
                .catch(e => console.log(e))
            userDroitsService.insert(2,2)
                .then(res => console.log(res))
                .catch(e => console.log(e))
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table user_droits déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }

    /*
                                        ##### ATELIER / FABRICATION #####
    */

        //Creation table plan_travail + seed plan_travail

        try {
            await postetravailService.dao.db.query("CREATE TABLE public.poste_travail(id_poste_travail SERIAL PRIMARY KEY, label TEXT)")
            // INSERTs
            postetravailService.insert("PosteTravail1")
                .then(res => console.log(res))
                .catch(e => console.log(e))
            postetravailService.insert("PosteTravail2")
                .then(res => console.log(res))
                .catch(e => console.log(e))
            postetravailService.insert("PosteTravail3")
                .then(res => console.log(res))
                .catch(e => console.log(e))
            postetravailService.insert("PosteTravail4")
                .then(res => console.log(res))
                .catch(e => console.log(e))
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table postetravail déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }

        //Creation table qualification + seed qualification

        try {
            await qualificationService.dao.db.query("CREATE TABLE public.qualification(id_qualification SERIAL PRIMARY KEY, id_user INT REFERENCES public.user(id_user) ON DELETE CASCADE, id_poste_travail INT REFERENCES public.poste_travail(id_poste_travail) ON DELETE CASCADE)")
            // INSERTs
            qualificationService.insert(1,1)
                .then(res => console.log(res))
                .catch(e => console.log(e))
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table qualification déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }

        //Creation table machine + seed machine

        try {
            await machineService.dao.db.query("CREATE TABLE public.machine(id_machine SERIAL PRIMARY KEY, label TEXT)")
            // INSERTs
            machineService.insert("visseuse")
                .then(res => console.log(res))
                .catch(e => console.log(e))
            machineService.insert("scie")
                .then(res => console.log(res))
                .catch(e => console.log(e))
            machineService.insert("pince")
                .then(res => console.log(res))
                .catch(e => console.log(e))
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table machine déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }

        // Creation table poste_machine + seed poste_machine

        try {
            await postemachineService.dao.db.query("CREATE TABLE public.poste_machine(id_poste_machine SERIAL PRIMARY KEY, id_poste_travail INT REFERENCES public.poste_travail(id_poste_travail) ON DELETE CASCADE, id_machine INT REFERENCES public.machine(id_machine) ON DELETE CASCADE)")
            // INSERTs
            postemachineService.insert(1,1)
                .then(res => console.log(res))
                .catch(e => console.log(e))
            postemachineService.insert(1,2)
                .then(res => console.log(res))
                .catch(e => console.log(e))
            postemachineService.insert(2,3)
                .then(res => console.log(res))
                .catch(e => console.log(e))
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table postemachine déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }

    /*
                                        ##### ATELIER / PIECE #####
    */

        // Creation table fournisseur_piece + seed fournisseur_piece

        try {
            await fournisseur_pieceService.dao.db.query("CREATE TABLE public.fournisseur_piece(id_fournisseur_piece SERIAL PRIMARY KEY, label TEXT)")
            // INSERTs
            fournisseur_pieceService.insert("fournisseur1")
                .then(res => console.log(res))
                .catch(e => console.log(e))
            fournisseur_pieceService.insert("fournisseur2")
                .then(res => console.log(res))
                .catch(e => console.log(e))
            fournisseur_pieceService.insert("fournisseur3")
                .then(res => console.log(res))
                .catch(e => console.log(e))
            fournisseur_pieceService.insert("fournisseur4")
                .then(res => console.log(res))
                .catch(e => console.log(e))
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table fournisseurpiece déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }

        // Creation table stock_piece + seed stock_piece

        try {
            await stock_pieceService.dao.db.query("CREATE TABLE public.stock_piece(id_stock_piece SERIAL PRIMARY KEY, quantite INT)")
            // INSERTs
            stock_pieceService.insert(10)
                .then(res => console.log(res))
                .catch(e => console.log(e))
            stock_pieceService.insert(100)
                .then(res => console.log(res))
                .catch(e => console.log(e))
            stock_pieceService.insert(1000)
                .then(res => console.log(res))
                .catch(e => console.log(e))
            stock_pieceService.insert(10000)
                .then(res => console.log(res))
                .catch(e => console.log(e))
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table stockpiece déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }

        // Creation table type_piece + seed type_piece

        try {
            await type_pieceService.dao.db.query("CREATE TABLE public.type_piece(id_type_piece SERIAL PRIMARY KEY, label TEXT)")
            // INSERTs
            type_pieceService.insert("pièces livrables")
                .then(res => console.log(res))
                .catch(e => console.log(e))
            type_pieceService.insert("pièces intermédiaires")
                .then(res => console.log(res))
                .catch(e => console.log(e))
            type_pieceService.insert("matières premières")
                .then(res => console.log(res))
                .catch(e => console.log(e))
            type_pieceService.insert(" pièces achetées")
                .then(res => console.log(res))
                .catch(e => console.log(e))
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table typepiece déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }

        // Creation table piece + seed piece

        try {
            await pieceService.dao.db.query("CREATE TABLE public.piece(id_piece SERIAL PRIMARY KEY, reference TEXT, label TEXT, prix_vente FLOAT, prix_achat FLOAT, id_stock_piece INT REFERENCES public.stock_piece(id_stock_piece), id_type_piece INT REFERENCES public.type_piece(id_type_piece), id_fournisseur_piece INT REFERENCES public.fournisseur_piece(id_fournisseur_piece))")
            // INSERTs
            pieceService.insert("PIECE0001", "raquette", 500.0, 0.0, 1, 1, 1)
                .then(res => console.log(res))
                .catch(e => console.log(e))
            pieceService.insert("PIECE0002", "manche raquette", 0.0, 0.0, 2, 2, 2)
                .then(res => console.log(res))
                .catch(e => console.log(e))
            pieceService.insert("PIECE0003", "bois", 0.0, 0.0, 3, 3, 3)
                .then(res => console.log(res))
                .catch(e => console.log(e))
            pieceService.insert("PIECE0004", "colle", 0.0, 100.0, 4, 4, 4)
                .then(res => console.log(res))
                .catch(e => console.log(e))
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table piece déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }

        // Creation table composition + seed composition

        try {
            await compositionService.dao.db.query("CREATE TABLE public.composition(id_composition SERIAL PRIMARY KEY, id_piece_cree INT REFERENCES public.piece(id_piece), id_piece_composition INT REFERENCES public.piece(id_piece), quantite INT)")
            // INSERTs
            compositionService.insert(1,4,10)
                .then(res => console.log(res))
                .catch(e => console.log(e))

        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table composition déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }

        /*
                                        ##### ATELIER / GAMME #####
        */

        // Creation table gamme + seed gamme
        
        try {
            await gammeService.dao.db.query("CREATE TABLE public.gamme(id_gamme SERIAL PRIMARY KEY, label TEXT, id_user INT REFERENCES public.user(id_user), id_piece INT REFERENCES public.piece(id_piece))")
            // INSERTs
            gammeService.insert("moule raquette",1,1)
                .then(res => console.log(res))
                .catch(e => console.log(e))
            gammeService.insert("moule table",1,2)
                .then(res => console.log(res))
                .catch(e => console.log(e))
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table gamme déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }

        // Creation table operation + seed operation
        
        try {
            await operationService.dao.db.query("CREATE TABLE public.operation(id_operation SERIAL PRIMARY KEY, label TEXT, id_poste_machine INT REFERENCES public.poste_machine(id_poste_machine), temps_travail INT)")
            // INSERTs
            operationService.insert("visser",1,300)
                .then(res => console.log(res))
                .catch(e => console.log(e))
            operationService.insert("decouper",2,500)
                .then(res => console.log(res))
                .catch(e => console.log(e))
            operationService.insert("assembler",3,3600)
                .then(res => console.log(res))
                .catch(e => console.log(e))
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table operation déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }

        // Creation table gamme_operation + seed gamme_operation
        
        try {
            await gamme_operationService.dao.db.query("CREATE TABLE public.gamme_operation(id_gamme_operation SERIAL PRIMARY KEY, id_gamme INT REFERENCES public.gamme(id_gamme), id_operation INT REFERENCES public.operation(id_operation))")
            // INSERTs
            gamme_operationService.insert(1,1)
                .then(res => console.log(res))
                .catch(e => console.log(e))
            gamme_operationService.insert(2,2)
                .then(res => console.log(res))
                .catch(e => console.log(e))
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table gamme_operation déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }

        //Creation table realisation + seed realisation

        try {
            await realisationService.dao.db.query("CREATE TABLE public.realisation(id_realisation SERIAL PRIMARY KEY, date DATE, id_gamme INT REFERENCES public.gamme(id_gamme))")
            // INSERTs
            realisationService.insert(new Date(),1)
                .then(res => console.log(res))
                .catch(e => console.log(e))
            realisationService.insert(new Date(),2)
                .then(res => console.log(res))
                .catch(e => console.log(e))
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table realisation déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }

        //Creation table realisation_operation + seed realisation_operation

        try {
            await realisationoperationService.dao.db.query("CREATE TABLE public.realisation_operation(id_realisation_operation SERIAL PRIMARY KEY, id_realisation INT REFERENCES public.realisation(id_realisation), id_operation INT REFERENCES public.operation(id_operation))")
            // INSERTs
            realisationoperationService.insert(1,1)
                .then(res => console.log(res))
                .catch(e => console.log(e))
            realisationoperationService.insert(2,2)
                .then(res => console.log(res))
                .catch(e => console.log(e))
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table realisation_operation déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }


})}