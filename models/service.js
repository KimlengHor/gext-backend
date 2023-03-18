const db = require('../utils/database');

module.exports = class Service {
    constructor(service_id, name, pricing, description) {
        this.service_id = service_id;
        this.name = name;
        this.pricing = pricing;
        this.description = description;
    }

    save(groomer_id) { 
        return db.execute('INSERT INTO services(name, pricing, description, groomer_id) VALUES (?, ?, ?, ?)',
        [this.name, this.pricing, this.description, groomer_id]
        );
    }

    static removeService(service_id) { 
        return db.execute('DELETE FROM services WHERE service_id = ?',
            [service_id]);
    }

    static findByGroomerId(groomer_id) { 
        return db.execute('SELECT service_id, name, pricing, description FROM services WHERE groomer_id = ?',
            [groomer_id]);
    }

    static updateService(service_id, service) { 
        return db.execute(`
            UPDATE services
            SET name = ?, pricing = ?, description = ?
            WHERE service_id = ?`,
        [service.name, service.pricing, service.description, service_id])
    }
};