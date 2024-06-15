class NotImplementedError extends Error {
  httpStatusCode = '501'

  constructor(message = 'Not Implemented') {
    super(message)
  }
}

module.exports = NotImplementedError
