const db = require('../utils/database');

module.exports = class Badge {
    constructor(name, number_of_appointments, badge_id) {
        this.badge_id = badge_id
        this.name = name;
        this.number_of_appointments = number_of_appointments;
    }

    save() { 
       
    }

    static findByGroomerId(groomer_id) { 
        return db.execute(`
            SELECT b.badge_id, b.number_of_appointments, b.name
            FROM owns o
            JOIN badges b
            ON o.badge_id = b.badge_id
            WHERE groomer_id = ?
            ORDER BY b.number_of_appointments DESC
        `, [groomer_id]);
    }
};