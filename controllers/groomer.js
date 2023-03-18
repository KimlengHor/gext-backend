const Customer = require('../models/customer');
const Groomer = require('../models/groomer');
const Pet = require('../models/pet');
const Appointment = require('../models/appointment');
const ServiceSnapshot = require('../models/serviceSnapshot');
const AddonSnapshot = require('../models/addonSnapshot');
const Service = require('../models/service');
const Addon = require('../models/addon');
const Badge = require('../models/badge');

exports.getGroomers = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    Groomer.fetchAll()
      .then(([rows, fieldData]) => {
          res.json({
              groomers: rows
          });
      })
      .catch(err => console.log(err));
};

exports.getGroomer = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    Groomer.findByAuthId(req.params.authId)
        .then(([groomers]) => { 
            res.json({
                groomer: groomers[0]
            });
        }).catch(err => console.log(err))
};

exports.postGroomer = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const email_address = req.body.email;
    const first_name = req.body.firstName;
    const last_name = req.body.lastName;
    const google_auth_id = req.body.authId;
    const groomer = new Groomer(null, email_address, first_name, last_name, google_auth_id);
    groomer.save()
        .then(() => { 
            res.json({
                message: "Successfully created"
            });
        })
        .catch(err => console.log(err));
};

//get customers
exports.getCustomers = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    Customer.findByGroomerId(req.params.groomerId).
        then(([customers]) => { 
            res.json({
                customers: customers
            });
        }).catch(err => console.log(err))
};

//get pets
exports.getCustomerDetails = (req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*");

    Pet.findByCustomerId(req.params.customerId).
        then(([pets]) => {
            Customer.findById(req.params.customerId).
                then(([customers]) => { 
                    res.json({
                        detail: {
                            customer: customers[0],
                            pets: pets
                        }
                    });
                }).catch(err => console.log(err))
        }).catch(err => console.log(err));
}

//get appointments
exports.getAppointments = (req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*");
    Appointment.findByGroomerId(req.params.groomerId, req.params.date)
        .then(([appointments]) => {
            res.json({
                appointments: appointments,
            });
        }).catch(err => console.log(err));
}

//create an appointment
exports.createAppointment = (req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*");
    const appointment = new Appointment(null, req.body.date, req.params.groomerId, req.params.petId)
    appointment.save()
        .then(([response]) => { 
            ServiceSnapshot.createMultipleServices(req.body.services, response.insertId)
                .then(() => { 
                    AddonSnapshot.createMultipleAddons(req.body.addons, response.insertId)
                        .then(() => { 
                        res.json({
                            message: "Appointment is created"
                        });
                    }).catch(err => console.log(err));
                }).catch(err => console.log(err));
        });
}

//get appointment details
exports.getAppointmentDetails = (req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*");
    Appointment.findById(req.params.appointmentId)
        .then(([appointments]) => {
            const appointment = appointments[0]
            ServiceSnapshot.findByAppointmentId(req.params.appointmentId).
                then(([services]) => { 
                    AddonSnapshot.findByAppointmentId(req.params.appointmentId).
                        then(([addons]) => {
                            res.json({
                                details: {
                                    appointment: {
                                        appointment_id: appointment.appointment_id,
                                        date: appointment.date
                                    },
                                    pet: {
                                        name: appointment.pet_name,
                                        breed: appointment.breed,
                                        gender: appointment.gender
                                    },
                                    customer: {
                                        first_name: appointment.first_name,
                                        last_name: appointment.last_name,
                                        phone_number: appointment.phone_number,
                                        email_address: appointment.email_address,
                                    },
                                    services: services,
                                    addons: addons,
                                }
                            });
                        }).catch(err => console.log(err));
                }).catch(err => console.log(err));
        }).catch(err => console.log(err));
}

//get services
exports.getServices = (req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*");
    Service.findByGroomerId(req.params.groomerId)
        .then(([services]) => {
            res.json({
                services: services,
            });
        }).catch(err => console.log(err));
}

//remove service
exports.removeService = (req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*");
    Service.removeService(req.params.serviceId)
        .then(() => {
            res.json({
                message: "Successfully removed",
            });
        }).catch(err => console.log(err));
}

//get addons
exports.getAddons = (req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*");
    Addon.findByGroomerId(req.params.groomerId)
        .then(([addons]) => {
            res.json({
                addons: addons,
            });
        }).catch(err => console.log(err));
}

//remove service
exports.removeAddon = (req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*");
    Addon.removeAddon(req.params.addon)
        .then(() => {
            res.json({
                message: "Successfully removed",
            });
        }).catch(err => console.log(err));
}

//get badges
exports.getBadges = (req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*");
    Badge.findByGroomerId(req.params.groomerId)
        .then(([badges]) => {
            res.json({
                badges: badges,
            });
        }).catch(err => console.log(err));
}

//edit groomer
exports.updateGroomer = (req, res, next) => { 

    res.header("Access-Control-Allow-Origin", "*");
    
    Groomer.updateGroomer(req.params.groomerId, req.body.groomer)
        .then(() => {
            res.json({
                message: "Successfully changed"
            });
        }).catch(err => console.log(err));
}

//create customer
exports.postCustomer = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const customerData = req.body.customer;
    const groomerId = req.params.groomerId;
    const customer = new Customer(null, customerData.emailAddress, customerData.firstName, customerData.lastName, customerData.phoneNumber)
    customer.save(groomerId)
        .then(() => { 
            res.json({
                message: "Successfully created"
            });
        })
        .catch(err => console.log(err));
};

//remove service
exports.removeCustomer = (req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*");
    Customer.removeCustomer(req.params.customerId)
        .then(() => {
            res.json({
                message: "Successfully removed",
            });
        }).catch(err => console.log(err));
}

//update customer
exports.updateCustomer = (req, res, next) => { 

    res.header("Access-Control-Allow-Origin", "*");
    
    Customer.updateCustomer(req.params.customerId, req.body.customer)
        .then(() => {
            res.json({
                message: "Successfully changed"
            });
        }).catch(err => console.log(err));
}

//get pets
exports.getPets = (req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*");
    Pet.findByCustomerId(req.params.customerId)
        .then(([pets]) => {
            res.json({
                pets: pets,
            });
        }).catch(err => console.log(err));
}

//remove service
exports.removePet = (req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*");
    Pet.removePet(req.params.petId)
        .then(() => {
            res.json({
                message: "Successfully removed",
            });
        }).catch(err => console.log(err));
}


//create customer
exports.createPet = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const petData = req.body.pet;
    const customerId = req.params.customerId;
    const pet = new Pet(petData)
    pet.save(customerId)
        .then(() => { 
            res.json({
                message: "Successfully created"
            });
        })
        .catch(err => console.log(err));
};

//update pet
exports.updatePet = (req, res, next) => { 

    res.header("Access-Control-Allow-Origin", "*");
    
    Pet.updatePet(req.params.petId, req.body.pet)
        .then(() => {
            res.json({
                message: "Successfully changed"
            });
        }).catch(err => console.log(err));
}

//create service
exports.createService = (req, res, next) => { 

    res.header("Access-Control-Allow-Origin", "*");
    const serviceData = req.body.service;
    const groomerId = req.params.groomerId;
    const service = new Service(null, serviceData.name, serviceData.pricing, serviceData.description)
    service.save(groomerId)
        .then(() => { 
            res.json({
                message: "Successfully created"
            });
        })
        .catch(err => console.log(err));
}

//update service
exports.updateService = (req, res, next) => { 

    res.header("Access-Control-Allow-Origin", "*");
    
    Service.updateService(req.params.serviceId, req.body.service)
        .then(() => {
            res.json({
                message: "Successfully changed"
            });
        }).catch(err => console.log(err));
}

//create addon
exports.createAddon = (req, res, next) => { 

    res.header("Access-Control-Allow-Origin", "*");
    const addonData = req.body.addon;
    const groomerId = req.params.groomerId;
    const addon = new Addon(null, addonData.name, addonData.pricing, addonData.description)
    addon.save(groomerId)
        .then(() => { 
            res.json({
                message: "Successfully created"
            });
        })
        .catch(err => console.log(err));
}

//update addon
exports.updateAddon = (req, res, next) => { 

    res.header("Access-Control-Allow-Origin", "*");
    
    Addon.updateAddon(req.params.addonId, req.body.addon)
        .then(() => {
            res.json({
                message: "Successfully changed"
            });
        }).catch(err => console.log(err));
}


