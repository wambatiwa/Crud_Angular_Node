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
    static findById(id) {
        return db
        .execute("SELECT * FROM groceries WHERE id = ?", [id])
        .then(([rows]) => {
        // `rows` is an array of results, but we only expect one item
        // If no item is found, rows will be an empty array
        if (rows.length === 0) {
            return null; // Return null if no item with the given id is found
        }
        return rows[0]; // Return the first (and only) item from the array
        })
        .catch((error) => {
        console.error("Error fetching grocery by id:", error);
        throw error; // Rethrow the error to be handled by the caller
        });
    }

    static update(id,item) {
        return db.execute('UPDATE groceries SET item = ? WHERE id = ?',[item,id]);
    }
    static deleteById(id) {
        return db.execute("DELETE FROM groceries WHERE id = ?", [id]);
    }
};