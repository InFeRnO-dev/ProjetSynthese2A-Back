const User = require('../class/user')
const List = require('../class/list')
const Item = require('../class/item')
const Partage = require('../class/partage')


module.exports = (userService) => {
    return new Promise(async (resolve, reject) => {
        console.log("test")
        /*try {

            await userService.dao.db.query("CREATE TABLE projet.user(id_user SERIAL PRIMARY KEY, email TEXT, password TEXT)")
            // INSERTs
            userService.inserthash("user0@test.com", "default")
                .then(_ => useraccountService.dao.getByLogin("user0@test.com"))
                .catch(e => console.log(e))
            userService.inserthash("user1@test.com", "default")
                .then(_ => useraccountService.dao.getByLogin("user1@test.com"))
                .catch(e => console.log(e))
            userService.inserthash("user2@test.com", "default")
                .then(_ => useraccountService.dao.getByLogin("user2@test.com"))
                .catch(e => console.log(e))
            userService.inserthash("user3@test.com", "default")
                .then(_ => useraccountService.dao.getByLogin("user3@test.com"))
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


        try {
            await listService.dao.db.query("CREATE TABLE list(id_list SERIAL PRIMARY KEY, shop TEXT, date DATE, archived BOOLEAN, fk_id_user INT REFERENCES useraccount(id_user) ON DELETE CASCADE)")
            // INSERTs
            await listService.dao.insert(new List("shop1", new Date(), false, 1))
            await listService.dao.insert(new List("shop2", new Date(), true, 1))
            await listService.dao.insert(new List("shop3", new Date(), false, 2))
            await listService.dao.insert(new List("shop4", new Date(), true, 2))
            await listService.dao.insert(new List("shop5", new Date(), false, 3))
            await listService.dao.insert(new List("shop6", new Date(), true, 3))
            await listService.dao.insert(new List("shop7", new Date(), false, 4))
            await listService.dao.insert(new List("shop8", new Date(), true, 4))
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table list déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }
        try {
            await itemService.dao.db.query("CREATE TABLE item(id_item SERIAL PRIMARY KEY, label TEXT, quantity NUMERIC, checked BOOLEAN, contains INT REFERENCES list(id_list) ON DELETE CASCADE, fk_id_user INT REFERENCES useraccount(id_user) ON DELETE CASCADE)")
            // INSERTs
                await itemService.dao.insert(new Item("Test",10,false,1,1))
            for (let j = 0; j < 2; j++) {
                await itemService.dao.insert(new Item("list1label" + j, 15 + j, false, 1,1))
            }
            for (let k = 0; k < 2; k++) {
                await itemService.dao.insert(new Item("list2label" + k, 25 + k, false, 2,2))
            }
        } catch (err) {
            if (err.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table item déjà créé")
            } else {
                reject(err)
                console.log(err)
            }
        }
        try {
            await partageService.dao.db.query("CREATE TABLE partage(id_partage SERIAL PRIMARY KEY, id_proprio INT REFERENCES useraccount(id_user) ON DELETE CASCADE, id_partage_user INT REFERENCES useraccount(id_user) ON DELETE CASCADE, id_list INT REFERENCES list(id_list) ON DELETE CASCADE, droits INT)")
            // INSERTs
            await partageService.dao.insert(new Partage(1,2, 1, 1))

        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table partage déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }
        */
    })
    
}