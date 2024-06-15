const EventController = module.exports
const { successResponse } = require('../helpers/http')

const EventService = require('../services/event')

EventController.findAll = async (req, res, next) => {
  const { perPage = 10, page = 1 } = req.query

  try {
    const events = await new EventService().findAll({
      perPage,
      page: parseInt(page, 10)
    })
    return successResponse(res, 200, 'List Events', events)
  } catch (error) {
    next(error)
  }
}

EventController.create = async (req, res, next) => {
  const body = req.body

  try {
    const event = await new EventService().create(body)
    return successResponse(res, '201', 'Event Created', event)
  } catch (error) {
    next(error)
  }
}

EventController.findOne = async (req, res, next) => {
  const id = req.params.id

  try {
    const event = await new EventService().findOne(id)
    return successResponse(res, 200, 'Read Event', event)
  } catch (error) {
    next(error)
  }
}

EventController.update = async (req, res, next) => {
  const id = req.params.id
  const payload = { ...req.body }

  try {
    const event = await new EventService().update(id, payload)
    return successResponse(res, 200, 'Event Updated', event)
  } catch (error) {
    next(error)
  }
}
