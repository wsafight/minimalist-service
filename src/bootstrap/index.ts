import 'reflect-metadata'
import { Middleware } from 'koa'
import { loadAppConfig } from './config/loadConfigByFile'
import { configureLogger, LogLevel } from './config/logger'
import { invariant } from './error/invariant'
import { getAppConfig } from './config/app'
import koaSetupServer from '../utils/setupService'

interface BootstrapConfig {
    logLevel: LogLevel
    logPath?: string
    filePath?: string
}

const bootstrapApp = (middlewares: Middleware[], controllers: Function[], config: BootstrapConfig) => {
    const { logLevel, logPath, filePath } = config

    configureLogger({
        level: logLevel,
        logPath: logPath,
        console: logLevel === 'debug'
    })

    const appConfig = loadAppConfig(filePath)

    return koaSetupServer(middlewares, {
        controllers,
        serverPort: appConfig.serverPort,
    })
}


export {
    invariant,
    bootstrapApp,
    getAppConfig,
}
