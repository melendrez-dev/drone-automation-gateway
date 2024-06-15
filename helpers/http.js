const HttpHelper = module.exports

HttpHelper.response = (
  data,
  status,
  message,
  pagination = {},
  error = false
) => {
  return {
    data,
    status,
    message,
    error,
    pagination
  }
}

HttpHelper.successResponse = (res, status, message, result = null) => {
  const { data = null, pagination = null } = result || {}
  return res
    .status(status)
    .json(HttpHelper.response(data, status, message, pagination))
}

HttpHelper.errorResponse = (res, status, message, error = true) => {
  return res
    .status(status)
    .json(HttpHelper.response(null, status, message, null, error))
}
