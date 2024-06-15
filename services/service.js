const { NotFoundError } = require('../errors/index')

class Service {
  constructor(repository) {
    this.repository = repository
  }

  async findAll(options = {}) {
    const result = await this.repository.findAll(options)

    if (!result) {
      throw new NotFoundError()
    }
    const {
      Documents: data,
      _count: count,
      paging: { recordsPerPage, totalPages, pageNumber } = {}
    } = result || {}

    return {
      data,
      pagination: {
        count,
        recordsPerPage,
        totalPages,
        pageNumber
      }
    }
  }
  async findOne(id) {
    const result = await this.repository.findOne(id)

    if (!result) {
      throw new NotFoundError()
    }
    const data = result || {}

    return {
      data
    }
  }

  async delete(id, eTag) {
    await this.repository.delete(id, eTag)
  }
}

module.exports = Service
