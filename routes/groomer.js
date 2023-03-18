const express = require('express');

const router = express.Router();

const groomerController = require('../controllers/groomer');

// groomer => GET
router.get('/groomers/:authId', groomerController.getGroomer);

// groomers => GET
router.get('/groomers', groomerController.getGroomers);

//update groomer
router.put('/groomer/:groomerId', groomerController.updateGroomer);

//create a groomer => POST
router.post('/groomer', groomerController.postGroomer);

//get details by customer id
router.get('/customers/details/:customerId', groomerController.getCustomerDetails);

//get customers by groomer id
router.get('/customers/:groomerId', groomerController.getCustomers);

//create customer
router.post('/customer/:groomerId', groomerController.postCustomer);

//remove customer
router.delete('/customer/:customerId', groomerController.removeCustomer);

//update customer
router.put('/customer/:customerId', groomerController.updateCustomer);

//get appointment details by appointment id
router.get('/appointments/details/:appointmentId', groomerController.getAppointmentDetails);

//get appointments by groomer id
router.get('/appointments/:groomerId/:date', groomerController.getAppointments);

// create appointment
router.post('/appointment/:groomerId/:petId', groomerController.createAppointment);

//get services by groomer id
router.get('/services/:groomerId', groomerController.getServices);

//get services by groomer id
router.get('/addons/:groomerId', groomerController.getAddons);

//get badges by groomer id
router.get('/badges/:groomerId', groomerController.getBadges);

//get pets
router.get('/pets/:customerId', groomerController.getPets);

//create pet
router.post('/pet/:customerId', groomerController.createPet);

//remove pet
router.delete('/pet/:petId', groomerController.removePet);

//update pet
router.put('/pet/:petId', groomerController.updatePet);

//create service
router.post('/service/:groomerId', groomerController.createService);

//update service
router.put('/service/:serviceId', groomerController.updateService);

//remove service
router.delete('/service/:serviceId', groomerController.removeService);

//create addon
router.post('/addon/:groomerId', groomerController.createAddon);

//remove addon
router.delete('/addon/:addon', groomerController.removeAddon);

//update addon
router.put('/addon/:addonId', groomerController.updateAddon);

module.exports = router;