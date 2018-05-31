function sendOkResponse(req, res) {
  res.json({
    status: 'ok',
    data: res.locals.products || res.locals.product || res.locals.users || res.locals.user
  })
}

function sendErrorResponse(err, req, res, next) {
  res.json({
    status: 'Error',
    message: err.message
  })
}

module.exports = {
  sendOkResponse,
  sendErrorResponse
}
