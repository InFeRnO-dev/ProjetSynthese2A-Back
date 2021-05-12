const ItemDAO = require("../datamodel/itemdao")

module.exports = class ItemService {
    constructor(db) {
        this.dao = new ItemDAO(db)
    }
    isValid(item) {
        item.label = item.label.trim()
        if (item.label === "") return false
        if ((item.quantity === null) || (item.quantity < 0)) return false
    return true
    }
}