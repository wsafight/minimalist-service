import {Context} from 'koa'
import {Ctx, JsonController, Get} from 'routing-controllers'

@JsonController('/hello')
export class HelloController {
  @Get('')
  hello(@Ctx() ctx: Context) {
    return 'hello word'
  }
}
