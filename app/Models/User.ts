import { BelongsTo, beforeSave, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import MyBaseModel from './Base'
import Role from './Role'

export default class User extends MyBaseModel {
  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string
  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @column()
  public roleId: string
  @belongsTo(() => Role,{
    localKey: 'id',
    foreignKey: 'roleId',
  })
  public role: BelongsTo<typeof Role>


  @column()
  public name: string

  @column()
  public mobile: string | null

  @column()
  public avatar: string | null
}
