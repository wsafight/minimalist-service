import 'reflect-metadata'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { useKoaServer } from 'routing-controllers'
import { errorMiddleware } from './middleware/error'
import { logMiddleware } from './middleware/log'
import { debug } from 'winston'

export const setupServer = (controllers: Function[]) => {
    const koa = new Koa()

    koa.use(errorMiddleware)

    koa.use(logMiddleware)

    koa.use(bodyParser())

    const app = useKoaServer(koa, {
        validation: false,
        defaultErrorHandler: false,
        controllers
    })

    const serverPort = 8089

    debug(`service start, serverPort is ${serverPort}`)
    app.listen(serverPort)
    return app
}

