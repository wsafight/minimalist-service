import { Context } from "koa"
import { error } from "winston"

export const handleErrorMiddleware = async (ctx: Context, next: () => Promise<any>) => {
    try {
        await next()
    } catch (err) {
        ctx.state = err.statusCode || err.status || 500;
        ctx.body = {
            errCode: 'error',
            status: ctx.status,
            errMsg: err.message
        }
        ctx.app.emit('error', err, ctx)
        error(err.stack)
    }
}
