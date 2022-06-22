import { Middleware } from 'koa'
import 'reflect-metadata'
import { loadAppConfig } from './config/loadConfigByFile'
import { configureLogger, LogLevel } from './config/logger'
import { setupServer } from './setupService'

interface BootstrapConfig {
    logLevel: LogLevel
    logPath?: string
    filePath?: string
}

export const bootstrapApp = (middlewares: Middleware[], controllers: Function[], config: BootstrapConfig) => {
    const { logLevel, logPath, filePath } = config

    configureLogger({
        level: logLevel,
        logPath: logPath,
        console: logLevel === 'debug'
    })

    loadAppConfig(filePath);

    return setupServer(middlewares, controllers)
}

