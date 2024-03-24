import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import MyBaseModel from './Base'

export default class Role extends MyBaseModel {
  @column()
  public createdBy: string

  @belongsTo(() => User,{
    localKey: 'id',
    foreignKey: 'created_by',
  })
  public user: BelongsTo<typeof User>

  @column()
  public name: string

  @column()
  public setting: string | null

  @column()
  public description: string | null
}
