import 'reflect-metadata'
import Koa, { Middleware}from 'koa'
import { useKoaServer } from 'routing-controllers'
import { debug } from 'winston'
import { getAppConfig } from './config/app'

export const setupServer = (middlewares: Middleware[], controllers: Function[]) => {
    const koa = new Koa()

    middlewares.forEach(middleware => {
        koa.use(middleware);
    })

    const app = useKoaServer(koa, {
        validation: false,
        defaultErrorHandler: false,
        controllers
    })

    const serverPort = getAppConfig().serverPort || 8089

    debug(`service start, serverPort is ${serverPort}`)
    app.listen(serverPort)
    return app
}

