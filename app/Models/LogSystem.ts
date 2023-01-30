import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
export default class LogSystem extends BaseModel {
  @column({ isPrimary: true })
  public user_id: number

  @column()
  public action: string

  @column()
  public endpoint: string

  @column()
  public before_data: JSON

  @column()
  public after_data: JSON

  @column()
  public ip: string

  @column()
  public user_agent: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
