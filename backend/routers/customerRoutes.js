const express = require('express')
const customerController = require('../controllers/customerController')
const locationController = require('../controllers/locationController')

const router = express.Router()

router.get('/getCustomer', customerController.getCustomer)
router.get('/getCustomerFull/:id', customerController.getCustomerFull)
router.get('/getCustomerByName/:name', customerController.regexpQuery)
router.post('/createCustomer', customerController.create)
router.patch('/updateCustomer', customerController.update)
router.delete('/deleteCustomer/:id', customerController.delete)

router.get('/trackRoutes', locationController.mapRoutes)

router.get('/getCordinate', locationController.getCordinate)
router.post('/createCordinate', locationController.create)
router.post('/createOneCordinate', locationController.createOne)
router.delete('/deleteCordinate/:email', locationController.delete)

module.exports = router