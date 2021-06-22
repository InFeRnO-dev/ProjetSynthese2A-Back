
module.exports = (userService, droitsService, userDroitsService, postetravailService, qualificationService, machineService, postemachineService) => {
    return new Promise(async (resolve, reject) => {

    /* 
                                    #### USER-DROITS #####
    */
        // creation table droits et seed droits
        
        try {
            await droitsService.dao.db.query("CREATE TABLE public.droits(id_droits SERIAL PRIMARY KEY, label TEXT)")
            // INSERTs
            droitsService.insert("admin")
                .then(res => console.log(res))
                .catch(e => console.log(e))
            droitsService.insert("atelier")
                .then(res => console.log(res))
                .catch(e => console.log(e))
            droitsService.insert("commercial")
                .then(res => console.log(res))
                .catch(e => console.log(e))
            droitsService.insert("comptabilite")
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
            userService.inserthash("user0@test.com", "default")
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
            machineService.insert("machine1")
                .then(res => console.log(res))
                .catch(e => console.log(e))
            machineService.insert("machine2")
                .then(res => console.log(res))
                .catch(e => console.log(e))
            machineService.insert("machine3")
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
    })

    

        
    
}