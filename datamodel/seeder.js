const User = require('../class/user')
const Droits = require('../class/droits')
const User_droits = require('../class/user_droits')

module.exports = (userService, droitsService, userDroitsService) => {
    return new Promise(async (resolve, reject) => {

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
    })
    
}