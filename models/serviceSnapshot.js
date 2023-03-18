const db = require('../utils/database');

module.exports = class ServiceSnapshot {
    constructor(snapshot_id, name, pricing, description, appointment_id) {
        this.snapshot_id = snapshot_id;
        this.name = name;
        this.pricing = pricing;
        this.description = description;
        this.appointment_id = appointment_id;
    }

    save() {
        return db.execute('INSERT INTO services_snapshot(name, pricing, description, appointment_id) VALUES (?, ?, ?, ?)',
            [this.name, this.pricing, this.description, this.appointment_id]
        );
    }

    static createMultipleServices(services, appointment_id) { 
        return db.query('INSERT INTO services_snapshot(name, pricing, description, appointment_id) VALUES ?',
            [services.map(service => [service.name, service.pricing, service.description, appointment_id])]
        );
    }

    static findByAppointmentId(appointment_id) { 
        return db.execute('SELECT snapshot_id, name, pricing FROM services_snapshot WHERE appointment_id = ?',
            [appointment_id]);
    }
};