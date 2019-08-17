import { IncomingMessage, ServerResponse } from 'http'
import httpProxy from 'http-proxy'

const proxy = httpProxy.createProxyServer()

const apiHandler = (req: IncomingMessage, res: ServerResponse) => {
  proxy.web(req, res, {
    target: 'http://localhost:4100',
  })
}

export default apiHandler
