import spdy from 'spdy'
import config from '../config'
import server from '../server/main'
import _debug from 'debug'

const debug = _debug('app:bin:server')
const port = config.server_port
const host = config.server_host

const options = {
  key: config.server_ssl_key,
  cert: config.server_ssl_cert,
  ca: config.server_ssl_ca
}

if (config.env === 'production') {
  spdy.createServer(options, server.callback()).listen(port, host)
  debug(`Server is now running at https://${host}:${port}.`)
} else {
  server.listen(port, host)
  debug(`Server is now running at http://${host}:${port}.`)
}
