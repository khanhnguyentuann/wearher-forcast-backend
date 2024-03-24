import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StatusCodes } from 'http-status-codes';

export default class AuthUser {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const { response, auth } = ctx

    const user = auth.user
    if (user == null || user == undefined) return response.abort(StatusCodes.FORBIDDEN);
    await user.load('role')
    ctx.user = user

    await next()
  }
}
