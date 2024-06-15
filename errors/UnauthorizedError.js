class UnauthorizedError extends Error {
  httpStatusCode = '401'

  constructor(message = 'Unauthorized Error') {
    super(message)
  }
}

module.exports = UnauthorizedError
