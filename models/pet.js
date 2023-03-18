const db = require('../utils/database');

module.exports = class Pet {
    constructor(petData) {
        this.petId = petData.pet_id;
        this.name = petData.name;
        this.breed = petData.breed;
        this.gender = petData.gender;
    }

    save(customer_id) { 
        return db.execute('INSERT INTO pets(name, breed, gender, customer_id) VALUES (?, ?, ?, ?)',
        [this.name, this.breed, this.gender, customer_id]
        );
    }

    static removePet(pet_id) { 
        return db.execute('DELETE FROM pets WHERE pet_id = ?',
            [pet_id]);
    }

    static findByCustomerId(customer_id) { 
        return db.execute('SELECT pet_id, name, breed, gender FROM pets WHERE customer_id = ?',
            [customer_id]);
    }

    static updatePet(pet_id, pet) { 
        return db.execute(`
            UPDATE pets
            SET name = ?, breed = ?, gender = ?
            WHERE pet_id = ?`,
        [pet.name, pet.breed, pet.gender, pet_id])
    }
};