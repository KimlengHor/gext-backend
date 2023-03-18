const db = require('../utils/database');

module.exports = class Groomer {
    constructor(groomer_id, email_address, first_name, last_name, google_auth_id) {
        this.groomer_id = groomer_id;
        this.email_address = email_address;
        this.first_name = first_name;
        this.last_name = last_name;
        this.google_auth_id = google_auth_id;
    }

    save() { 
        return db.execute('INSERT INTO groomers(email_address, first_name, last_name, google_auth_id) VALUES (?, ?, ?, ?)',
        [this.email_address, this.first_name, this.last_name, this.google_auth_id]
        );
    }

    static fetchAll() { 
        return db.execute('SELECT * FROM groomers');
    }

    static findByAuthId(google_auth_id) { 
        return db.execute('SELECT * FROM groomers WHERE  google_auth_id = ?', [google_auth_id]);
    }

    static updateGroomer(auth_id, groomer) { 
        return db.execute(`
                UPDATE groomers
                SET first_name = ?, last_name = ?
                WHERE google_auth_id = ?`,
        [groomer.firstName, groomer.lastName, auth_id])
    }
};