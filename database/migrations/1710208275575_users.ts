import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.dropTableIfExists(this.tableName)
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('name', 255).notNullable()
      table.string('remember_me_token').nullable()

      // FK
      table.string('role_id')       // reference on roles table

      // ts
      table.timestamp('deleted_at', { useTz: true }).nullable()
      table.timestamps(true, true)

      // indices
      table.index(['role_id'],          `index_${this.tableName}_on_role_id`)
      table.index(['created_at'],       `index_${this.tableName}_created_at`)
      table.index(['updated_at'],       `index_${this.tableName}_updated_at`)
      table.index(['deleted_at'],       `index_${this.tableName}_deleted_at`)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
