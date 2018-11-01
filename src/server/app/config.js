
const {resolve} = require('path')

const p = resolve(
  process.cwd(),
  'package.json'
)
const pack = require(p)
const {
  PORT = 7887,
  HOST = 'localhost'
} = process.env

module.exports = exports.default = {
  port: parseInt(PORT),
  host: HOST,
  pack
}
