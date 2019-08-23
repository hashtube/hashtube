import { ServerMiddleware } from '@nuxt/types'
import { IncomingMessage, ServerResponse } from 'http'
import httpProxy from 'http-proxy'

const proxy = httpProxy.createProxyServer()

const apiHandler: ServerMiddleware = (req: IncomingMessage, res: ServerResponse) => {
  proxy.web(req, res, {
    target: 'http://api:4100',
  })
}

export default apiHandler
