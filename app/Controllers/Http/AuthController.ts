import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { StatusCodes } from 'http-status-codes'
import SendResetPasswordEmailJob from 'App/Jobs/SendResetPasswordEmailJob'
import { passwordGenerator } from 'App/Utils/helper'
import Database from '@ioc:Adonis/Lucid/Database'
import Role from 'App/Models/Role'
import { RegisterCustomerValidator } from 'App/Validators/AuthValidator'

export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    let user = await User.query().where('email', email).first()
    if (user == null) {
      return response.abort(
        { message: 'User not found!', code: StatusCodes.UNAUTHORIZED },
        StatusCodes.UNAUTHORIZED
      )
    }
    const token = await auth.use('api').attempt(email, password)
    return response.status(StatusCodes.OK).send({
      message: 'Login successfully',
      token: token.toJSON()
    })
  }

  public async resetPassword({ request }: HttpContextContract) {
    const email = request.input('email')
    let user = await User.query().where('email', email).first()
    if (user == null) {
      return {
        status: -1,
        msg: 'Email does not exist in system.',
      }
    }

    let newPassword = passwordGenerator(8)
    user.password = newPassword
    await user.save()

    await SendResetPasswordEmailJob.dispatch({
      name: user.name,
      password: user.password,
      email: user.email,
    })

    return {
      status: 0,
      msg: 'New password is send to your email.',
    }
  }

  public async changePassword({ request, auth, user }: HttpContextContract) {
    let current_password = request.input('current_password')
    let new_password = request.input('new_password')

    await auth.use('api').attempt(user.email, current_password)
    user.password = new_password
    user.save()

    return {
      status: true,
      message: 'Changed password successfully',
    }
  }

  public async profile({ user, response }: HttpContextContract) {

    return response.status(StatusCodes.OK).json({
      email: user.email,
      name: user.name,
      mobile: user.mobile || null,
      avatar: user.avatar || null,
    })
  }

  public async register({ request, response }: HttpContextContract) {
    const validatedData = await request.validate(RegisterCustomerValidator)

    const trx = await Database.transaction()
    const customerRole = await Role.query().where('name', 'user').firstOrFail()

    const user = new User()
    user.fill({
      email: validatedData.email,
      name: validatedData.name,
      password: validatedData.password,
      roleId: customerRole.id,
    })
    await user.useTransaction(trx).save()

    await trx.commit()

    return response.status(StatusCodes.CREATED).send({
      message: 'The account has been created successfully.'
    })
  }
}
