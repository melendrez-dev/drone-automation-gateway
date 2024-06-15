class NotFoundError extends Error {
  httpStatusCode = '404'

  constructor(message = 'Data Not Found') {
    super(message)
  }
}

module.exports = NotFoundError
