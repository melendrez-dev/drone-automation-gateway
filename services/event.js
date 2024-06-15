const Service = require('./service')
const EventRepository = require('../repositories/event')
const NotFoundError = require('../errors/NotFoundError')
const { v4: uuidv4 } = require('uuid')

class EventService extends Service {
  constructor() {
    super(new EventRepository())
  }

  async findAll(options = {}) {
    const data = await this.repository.findAll(options)

    if (!data) {
      throw new NotFoundError()
    }

    const { perPage, page } = options

    return {
      data: data['events'],
      //TODO: Move this paginator creator into util function
      pagination: {
        total: data['events'].length,
        skip: data['skip'],
        perPage: perPage,
        pageCount: perPage * page,
        currentPage: page
      }
    }
  }

  async create(payloadData) {
    const payload = {
      id: uuidv4(),

      name: payloadData?.name,

      description: payloadData?.description,
      contact: {
        fullName: payloadData?.contact_name,
        email: payloadData?.contact_email,
        phone: payloadData?.contact_phone
      },
      billing: {}
    }

    const result = await this.repository.create(payload)

    if (!result) {
      throw new NotFoundError()
    }
    const data = result || {}

    return {
      data
    }
  }

  async update(id, payloadData) {
    const payload = {
      id: id,

      name: payloadData?.name,

      description: payloadData?.description,
      contact: {
        fullName: payloadData?.contact_name,
        email: payloadData?.contact_email,
        phone: payloadData?.contact_phone
      },
      billing: {}
    }

    const eTag = payloadData?.etag

    const result = await this.repository.update(id, payload, eTag)

    if (!result) {
      throw new NotFoundError()
    }
    const data = result || {}

    return {
      data
    }
  }
}

module.exports = EventService
