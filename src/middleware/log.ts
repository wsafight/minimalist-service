import { Context } from 'koa'
import { log } from "winston";

export const handleLogMiddleware = async (ctx: Context, next: () => Promise<any>) => {
    const start = new Date().getTime()
    await next()
    const ms = new Date().getTime() - start

    let logLevel: string = 'info'
    if (ctx.status >= 500) {
        logLevel = 'error'
    } else if (ctx.status >= 400) {
        logLevel = 'warn'
    }
    log(logLevel, `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`)
}
