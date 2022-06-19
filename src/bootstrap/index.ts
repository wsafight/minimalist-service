import 'reflect-metadata'
import { HelloController } from '../controllers/hello'
import { loadAppConfig } from './config/loadConfigByFile'
import { configureLogger, LogLevel } from './config/logger'
import { setupServer } from './setupService'

interface BootstrapConfig {
    logLevel?: LogLevel
    logPath?: string
    /** 配置文件路径 */
    filePath?: string
    /** 阿波罗配置项 */
    appllo?: string;
}

export const bootstrapApp = (config: BootstrapConfig) => {
    const { logLevel, logPath, filePath, appllo } = config
    configureLogger({
        level: logLevel,
        logPath: logPath,
        console: logLevel === 'debug'
    })
    
    // if (typeof filePath === 'string' && filePath.length > 0) {
    //     loadAppConfig()
    // } else {
    //     loadAppConfig();
    // }

    return setupServer([HelloController])
}

