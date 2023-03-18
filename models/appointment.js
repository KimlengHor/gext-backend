const db = require('../utils/database');

module.exports = class Appointment {
    constructor(appointment_id, date, groomer_id, pet_id) {
        this.appointment_id = appointment_id;
        this.date = date;
        this.groomer_id = groomer_id;
        this.pet_id = pet_id;
    }

    save() { 
        return db.execute('INSERT INTO appointments(date, groomer_id, pet_id) VALUES (?, ?, ?)',
            [this.date, this.groomer_id, this.pet_id]
        );
    }

    static findById(appointment_id) { 
        return db.execute(
            `SELECT a.appointment_id, a.date, p.name AS pet_name, p.breed, p.gender, c.first_name, c.last_name, c.phone_number, c.email_address
            FROM appointments a
            LEFT JOIN pets p
            ON a.pet_id = p.pet_id
            LEFT JOIN customers c
            ON c.customer_id = p.customer_id
            WHERE a.appointment_id = ?`,
            [appointment_id]
        );
    }

    static findByGroomerId(groomer_id, date) { 
        return db.execute(`SELECT a.appointment_id, a.date, p.name AS pet_name, c.first_name, c.last_name, c.phone_number  
                            FROM appointments a
                            LEFT JOIN pets p
                            ON a.pet_id = p.pet_id
                            LEFT JOIN customers c
                            ON c.customer_id = p.customer_id
                            WHERE CAST(a.date AS DATE) = ? AND a.groomer_id = ?
                            ORDER BY a.date ASC`,
            [date, groomer_id]);
    }
};