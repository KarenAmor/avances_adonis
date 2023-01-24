import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ request }: HttpContextContract) {
    const registerSchema = schema.create({
      name: schema.string({}, [rules.maxLength(50)]),
      email: schema.string({}, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
        rules.maxLength(100),
      ]),
      password: schema.string({}, [rules.confirmed(), rules.minLength(8), rules.maxLength(50)]),
    })
    await request.validate({ schema: registerSchema })

    // Register User
    const user = new User()
    user.name = request.input('name')
    user.email = request.input('email')
    user.password = request.input('password')
    await user.save()

    return user
  }
  public async login({ request, auth }: HttpContextContract) {
    const registerSchema = schema.create({
      email: schema.string({}, [rules.email(), rules.maxLength(100)]),
      password: schema.string({}, [rules.minLength(8), rules.maxLength(50)]),
    })
    await request.validate({ schema: registerSchema })

    const email = request.input('email')
    const password = request.input('password')

    return auth.use('api').attempt(email, password)
  }

  public async user({ auth }: HttpContextContract) {
    return auth.use('api').user
  }

  public async logout({ auth }: HttpContextContract) {
    return auth.use('api').logout()
  }
}
