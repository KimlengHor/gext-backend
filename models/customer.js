const db = require('../utils/database');

module.exports = class Customer {
    constructor(customer_id, email_address, first_name, last_name, phone_number) {
        this.customer_id = customer_id;
        this.email_address = email_address;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
    }

    save(groomer_id) { 
        return db.execute('INSERT INTO customers(email_address, first_name, last_name, phone_number, groomer_id) VALUES (?, ?, ?, ?, ?)',
        [this.email_address, this.first_name, this.last_name, this.phone_number, groomer_id]
        );
    }

    static removeCustomer(customer_id) { 
        return db.execute('DELETE FROM customers WHERE customer_id = ?',
            [customer_id]);
    }

    static findByGroomerId(groomer_id) { 
        return db.execute('SELECT customer_id, email_address, first_name, last_name, phone_number FROM customers WHERE groomer_id = ?',
            [groomer_id]);
    }

    static findById(customer_id) { 
        return db.execute('SELECT customer_id, email_address, first_name, last_name, phone_number FROM customers WHERE customer_id = ?',
            [customer_id]);
    }

    static updateCustomer(customer_id, customer) { 
        return db.execute(`
                UPDATE customers
                SET email_address = ?, first_name = ?, last_name = ?, phone_number = ?
                WHERE customer_id = ?`,
        [customer.emailAddress, customer.firstName, customer.lastName, customer.phoneNumber, customer_id])
    }
};