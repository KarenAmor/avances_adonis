import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LogSystem from "App/Models/LogSystem";
import moment from "moment";
import schema from '@ioc:Adonis/Lucid/Schema'

export default class LogSystemsController {

  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const logSystem = await LogSystem.query().orderBy('created_at', 'desc').paginate(page, 10)
    return logSystem
  }

  public static async store({ request, auth }: HttpContextContract) {
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
    logSystem.save()

    return logSystem
  }

  public async show ({ params, response }: HttpContextContract) {
    const logSystem = await LogSystem.findOrFail(params.id)
    return response.json(logSystem)
  }

  public async destroy () {
    const oneMonthAgo = moment().subtract(1, "months").toDate();
    const logs = await LogSystem.query().where('created_at', '<', oneMonthAgo).delete()
    return logs
}
}

