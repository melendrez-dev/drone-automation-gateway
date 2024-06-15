const router = require('express').Router()
const EventController = require('../../../controllers/events')

router.post('/', EventController.create)
router.get('/:id', EventController.findOne)
router.get('/', EventController.findAll)

module.exports = router
