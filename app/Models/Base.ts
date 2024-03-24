import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { serializeDateTime } from 'App/Utils/helper'
import { ulid } from 'ulid'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { compose } from '@ioc:Adonis/Core/Helpers'

export default class MyBaseModel extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  public id: string
  @beforeCreate()
  public static async generateULID(base: MyBaseModel) {
    base.id = ulid()
  }

  @column.dateTime({
    serialize: (value?: DateTime) => serializeDateTime(value)
  })
  public deletedAt: DateTime

  @column.dateTime({
    autoCreate: true,
    serialize: (value?: DateTime) => serializeDateTime(value)
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true, autoUpdate: true,
    serialize: (value?: DateTime) => serializeDateTime(value)
  })
  public updatedAt: DateTime
}
