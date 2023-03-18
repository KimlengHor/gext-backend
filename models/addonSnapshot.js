const db = require('../utils/database');

module.exports = class AddonSnapshot {
    constructor(snapshot_id, name, pricing, description, appointment_id) {
        this.snapshot_id = snapshot_id;
        this.name = name;
        this.pricing = pricing;
        this.description = description;
        this.appointment_id = appointment_id;
    }

    save() { 
        return db.execute('INSERT INTO addons_snapshot(name, pricing, description, appointment_id) VALUES (?, ?, ?, ?)',
            [this.name, this.pricing, this.description, this.appointment_id]
        );
    }

    static createMultipleAddons(addons, appointment_id) { 
        return db.query('INSERT INTO addons_snapshot(name, pricing, description, appointment_id) VALUES ?',
            [addons.map(addon => [addon.name, addon.pricing, addon.description, appointment_id])]
        );
    }

    static findByAppointmentId(appointment_id) { 
        return db.execute('SELECT snapshot_id, name, pricing FROM addons_snapshot WHERE appointment_id = ?',
            [appointment_id]);
    }
};