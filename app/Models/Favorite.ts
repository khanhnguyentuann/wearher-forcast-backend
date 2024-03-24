import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import MyBaseModel from './Base'

export default class Favorite extends MyBaseModel {
  @column()
  public userId: string

  @belongsTo(() => User,{
    localKey: 'id',
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>

  @column()
  public weatherType: string

  @column()
  public region: string | null
}
