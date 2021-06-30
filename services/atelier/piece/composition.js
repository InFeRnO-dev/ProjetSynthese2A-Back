const CompositionDAO = require("../../../datamodel/atelier/piece/composition")
const Composition = require('../../../class/atelier/piece/composition')

module.exports = class CompositionService {
    constructor(db) {
        this.dao = new CompositionDAO(db)
    }

    async getAll(){
        return this.dao.getAll()
    }
    
    async insert(id_piece_cree, id_piece_composition, quantite){
        return this.dao.insert(new Composition(id_piece_cree, id_piece_composition, quantite))
    }
}