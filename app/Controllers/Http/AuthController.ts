import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AuthController {
  public async checkDb({}: HttpContextContract) {
    const users = await Database.query().from('users').select('*')
    return users
  }
}
