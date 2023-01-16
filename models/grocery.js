const db = require("../utils/database");
module.exports = class Grocery {
    constructor(id,item) {
        this.id = id;
        this.item = item;
    }

    static fetchAll() {
        return db.execute('SELECT * FROM groceries');
    }
    static post (item) {
        return db.execute("INSERT INTO groceries (item) VALUES (?)",[item]);
    }

    static update(id,item) {
        return db.execute('UPDATE groceries SET item = ? WHERE id = ?',[item,id]);
    }
    static deleteById(id) {
        return db.execute("DELETE FROM groceries WHERE id = ?", [id]);
    }
};