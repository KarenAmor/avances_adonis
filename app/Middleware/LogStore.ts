import LogSystem from 'App/Models/LogSystem'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class LogStore {
  public async handle({ request, auth}: HttpContextContract, next: () => Promise<void>) {
    const newLogSystemSchema = schema.create({
      action: schema.string(),
      endpoint: schema.string(),
    })

    await request.validate({ schema: newLogSystemSchema })

    const logSystem = new LogSystem()
    logSystem.user_id = auth.user?.id ?? 0
    logSystem.action = request.input('action')
    logSystem.endpoint = request.input('endpoint')
    logSystem.before_data = request.input('before_data')
    logSystem.after_data = request.input('after_data')
    logSystem.ip = request.input('ip')
    logSystem.user_agent = request.input('user_agent')
    await logSystem.save()

    await next()
  }
}
