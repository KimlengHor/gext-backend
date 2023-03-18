const db = require('../utils/database');

module.exports = class Addon {
    constructor(addon_id, name, pricing, description) {
        this.addon_id = addon_id;
        this.name = name;
        this.pricing = pricing;
        this.description = description;
    }

    save(groomer_id) { 
        return db.execute('INSERT INTO addons(name, pricing, description, groomer_id) VALUES (?, ?, ?, ?)',
        [this.name, this.pricing, this.description, groomer_id]
        );
    }
    
    static removeAddon(addon_id) { 
        return db.execute('DELETE FROM addons WHERE addon_id = ?',
            [addon_id]);
    }

    static findByGroomerId(groomer_id) { 
        return db.execute('SELECT addon_id, name, pricing, description FROM addons WHERE groomer_id = ?',
            [groomer_id]);
    }

    static updateAddon(addon_id, addon) { 
        return db.execute(`
            UPDATE addons
            SET name = ?, pricing = ?, description = ?
            WHERE addon_id = ?`,
        [addon.name, addon.pricing, addon.description, addon_id])
    }
};