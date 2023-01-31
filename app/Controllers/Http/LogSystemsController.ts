import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LogSystem from "App/Models/LogSystem";
import moment from "moment";

export default class LogSystemsController {
  public async index({response}: HttpContextContract){
    const logSystem = await LogSystem.all()
    console.log(logSystem)
    return response.json(logSystem)
  }

  public async store ({ request, response }: HttpContextContract) {
    const data = request.only(['action', 'endpoint', 'before_data', 'after_data', 'ip', 'user_agent', 'created_at', 'updated_at', "user_id"])
    const logSystem = await LogSystem.create(data)
    return response.json(logSystem)
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

