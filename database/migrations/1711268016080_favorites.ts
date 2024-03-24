import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'favorites'

  public async up() {
    this.schema.dropTableIfExists(this.tableName)
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('weather_type', 255)
      table.string('region ', 180)

      // FK
      table.string('user_id')       // reference on users table

      // ts
      table.timestamp('deleted_at', { useTz: true }).nullable()
      table.timestamps(true, true)

      // indices
      table.index(['user_id'],          `index_${this.tableName}_on_user_id`)
      table.index(['created_at'],       `index_${this.tableName}_created_at`)
      table.index(['updated_at'],       `index_${this.tableName}_updated_at`)
      table.index(['deleted_at'],       `index_${this.tableName}_deleted_at`)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

