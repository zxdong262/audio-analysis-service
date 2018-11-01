/**
 * response helper
 */

export default (
  msg,
  status = 200,
  options = {}
) => {
  return {
    statusCode: status,
    body: msg,
    ...options
  }
}
