import 'reflect-metadata'
import { Middleware } from 'koa'
import { loadAppConfig } from './config/loadConfigByFile'
import { configureLogger, LogLevel } from './config/logger'
import { setupServer } from './setupService'
import { invariant } from './error/invariant'
import { getAppConfig } from './config/app'

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

    loadAppConfig(filePath)

    return setupServer(middlewares, controllers)
}


export {
    invariant,
    bootstrapApp,
    getAppConfig,
}
