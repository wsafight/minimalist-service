
import Koa, { Middleware } from 'koa'
import { useKoaServer, RoutingControllersOptions } from 'routing-controllers'

const DEFAULT_OPTIONS = {
    validation: false,
    defaultErrorHandler: false,
};

interface KoaSetupServerOptions extends RoutingControllersOptions {
    serverPort?: number;
}

const koaSetupServer = (middlewares: Middleware[], options: KoaSetupServerOptions) => {
    const koa = new Koa()

    middlewares.forEach(middleware => {
        koa.use(middleware);
    })

    const { serverPort, ...routingControllersOptions } = options;

    const routingOptions = Object.assign({}, DEFAULT_OPTIONS, routingControllersOptions)
    const app = useKoaServer(koa, routingOptions)
    app.listen(serverPort || 8089)
    return app
}

export default koaSetupServer