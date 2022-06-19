import { configure, format, transports } from 'winston'
import * as Transport from 'winston-transport'
import DailyRotateFile from 'winston-daily-rotate-file'

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface ConfigureLoggerOptions {
    level: LogLevel
    console?: boolean
    logPath?: string
}

export const configureLogger = (options: ConfigureLoggerOptions) => {
    const defaultFileFormat = format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(info => `${info.timestamp},${info.level},${info.message}`)
    )
    const logPath = options.logPath || './logs'

    const fileTransport = new DailyRotateFile({
        filename: logPath + '/%DATE%.log',
        datePattern: 'YY-MM-DD',
        maxSize: '5m',
        maxFiles: '14d',
        zippedArchive: true,
        json: false,
        level: options.level,
        format: defaultFileFormat,
    })

    const logTransports: Transport[] = [fileTransport]

    if (options.console) {
        logTransports.push(new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }))
    }

    configure({
        level: options.level,
        transports: logTransports
    })
}
