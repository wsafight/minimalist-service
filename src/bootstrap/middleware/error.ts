import { Context } from "koa"
import { error } from "winston"
import { RequestArgumentError, SqlExcuteError } from "../error/business-error"

export const errorMiddleware = async (ctx: Context, next: () => Promise<any>) => {
    try {
        await next()
    } catch (err) {
        ctx.type = 'json'

        if (err instanceof RequestArgumentError) {
            ctx.status = 400
        } else if (err instanceof SqlExcuteError) {
            ctx.status = 500
        }
        
        ctx.body = {
            errCode: 'error',
            status: ctx.status,
            errMsg: err.message
        }

        ctx.app.emit('error', err, ctx)
        error(err.stack)
    }
}
